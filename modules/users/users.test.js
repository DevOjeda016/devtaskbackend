import supertest from 'supertest';
import dbConnection from '../../db/index.js';
import userDal from './usersDal.js';
import { hashPassword } from '../../utils/encryption.js';
import testHelper from './testHelper.js';
import app from '../../app.js';

const api = supertest(app);
const URL_API_USERS = '/api/users';

beforeAll(() => dbConnection.connectToDb());
afterAll(() => dbConnection.disconnectDb());

describe('API Endpoints - RESTful Integration Tests', () => {
  beforeEach(async () => {
    await testHelper.deleteUsers();
    await testHelper.initializeUsers();
  });
  describe('POST /api/users', () => {
    const dataToSend = {
      name: 'Test',
      lastname: 'User',
      username: 'test.user',
      password: 'TestUser123*',
      email: 'test.user@example.com',
      role: 'user',
      projects: [],
    };

    it('should validate registering a new user successfully', async () => {
      const response = await api.post(URL_API_USERS)
        .send(dataToSend)
        .set('Content-Type', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);

      const createdUser = response.body;
      // Validate that the response contains the expected public fields
      expect(createdUser).toBeDefined();
      expect(createdUser.name).toBe(dataToSend.name);
      expect(createdUser.lastname).toBe(dataToSend.lastname);
      expect(createdUser.username).toBe(dataToSend.username);
      expect(createdUser.role).toBe(dataToSend.role);
      expect(createdUser.projects).toEqual(dataToSend.projects);

      // Validate if the user has an MongoDB ObjectId
      expect(createdUser.id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(createdUser).toHaveProperty('id');

      // Validate that the response does not contain private fields
      expect(createdUser).not.toHaveProperty('__v');
      expect(createdUser).not.toHaveProperty('_id');
      expect(createdUser).not.toHaveProperty('password');
      expect(createdUser).not.toHaveProperty('passwordHashed');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users with valid public fields', async () => {
      const response = await api
        .get(URL_API_USERS)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);

      // Verify that each user has the expected public fields
      response.body.forEach((user) => {
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('lastname');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('projects');

        // Verify that the user has a valid MongoDB ObjectId
        expect(user).toHaveProperty('id');
        expect(user.id).toMatch(/^[0-9a-fA-F]{24}$/);

        // Verify that user does not have private fields
        expect(user).not.toHaveProperty('__v');
        expect(user).not.toHaveProperty('_id');
        expect(user).not.toHaveProperty('password');
        expect(user).not.toHaveProperty('passwordHashed');
      });
    });

    it('should return empty array when there are no users', async () => {
      await testHelper.deleteUsers();
      const response = await api
        .get(URL_API_USERS)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      // Expect the response to be an empty array (length 0)
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID with valid public fields', async () => {
      const users = await testHelper.usersInDb();
      const userToFind = users[0];

      const response = await api
        .get(`${URL_API_USERS}/${userToFind.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const foundUser = response.body;

      // Validate that the response contains the expected public fields
      expect(foundUser).toBeDefined();
      expect(foundUser.name).toBe(userToFind.name);
      expect(foundUser.lastname).toBe(userToFind.lastname);
      expect(foundUser.username).toBe(userToFind.username);
      expect(foundUser.email).toBe(userToFind.email);
      expect(foundUser.role).toBe(userToFind.role);
      expect(foundUser.projects).toEqual(userToFind.projects);

      // Validate if the user has an MongoDB ObjectId
      expect(foundUser.id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(foundUser).toHaveProperty('id');

      // Validate that the response does not contain private fields
      expect(foundUser).not.toHaveProperty('__v');
      expect(foundUser).not.toHaveProperty('_id');
      expect(foundUser).not.toHaveProperty('password');
      expect(foundUser).not.toHaveProperty('passwordHashed');
    });

    it('should return 404 for non-existing user', async () => {
      const nonExistingId = await testHelper.nonExistingId();
      const response = await api
        .get(`${URL_API_USERS}/${nonExistingId}`)
        .expect(404)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({ error: 'Usuario no encontrado' });
    });

    it('should return 400 for invalid user ID format', async () => {
      const invalidId = 'invalid-id';
      const response = await api
        .get(`${URL_API_USERS}/${invalidId}`)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({ error: 'ID inválido' });
    });
  });
});

describe('User Model - CRUD Operations Unit Tests', () => {
  beforeEach(async () => {
    await testHelper.deleteUsers();
    await testHelper.initializeUsers();
  });
  describe('CREATE', () => {
    it('should validate registering a new user successfully', async () => {
      const passwordHashed = await hashPassword('TestUser123*');
      const testData = {
        name: 'Test',
        lastname: 'User',
        username: 'test.user',
        passwordHashed,
        email: 'test.user@example.com',
        role: 'user',
        projects: [],
      };

      const userCreated = await userDal.create(testData);
      expect(userCreated).toHaveProperty('name', testData.name);
      expect(userCreated).toHaveProperty('lastname', testData.lastname);
      expect(userCreated).toHaveProperty('email', testData.email);
      expect(userCreated).toHaveProperty('username', testData.username);
      expect(userCreated).toHaveProperty('projects', testData.projects);
      expect(userCreated).toHaveProperty('role', testData.role);
      expect(userCreated).toHaveProperty('passwordHashed');
      expect(userCreated._id).toBeDefined();
    });
  });

  describe('READ', () => {
    it('should validate getting all users', async () => {
      const users = await userDal.findAll();
      const initialUsers = await testHelper.getInitialUsers();
      expect(users).toHaveLength(initialUsers.length);
      const names = users.map((u) => u.name);
      expect(names).toEqual(expect.arrayContaining(['root', 'John']));
    });
  });

  it('should validate getting a user by id', async () => {
    const users = (await userDal.findAll());
    const userToFind = users[0].toJSON();
    const userFound = (await userDal.findById(userToFind.id)).toJSON();
    Object.entries(userToFind).forEach(([k, v]) => {
      expect(userFound).toHaveProperty(k, v);
    });
  });
});
