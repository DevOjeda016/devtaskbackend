import User from './usersModel.js';
import { hashPassword } from '../../utils/encryption.js';

const getInitialUsers = async () => {
  const users = [
    {
      name: 'root',
      lastname: 'Ojeda',
      username: 'root.user',
      password: 'Password123*',
      email: 'root.user@example.com',
      role: 'user',
      projects: [],
    },
    {
      name: 'John',
      lastname: 'Doe',
      username: 'john.doe',
      password: 'JohnDoe123*',
      email: 'john.doe@example.com',
      role: 'user',
      projects: [],
    },
  ];

  // Hash plain text passwords and delete property password

  const usersWithHashedPasswords = await Promise.all(
    users.map(async (u) => {
      const { password, ...rest } = u;
      return {
        ...rest,
        passwordHashed: await hashPassword(password),
      };
    }),
  );

  return usersWithHashedPasswords;
};

const initializeUsers = async () => {
  const users = await getInitialUsers();
  await User.insertMany(users);
};

const deleteUsers = async () => {
  await User.deleteMany({});
};

const nonExistingId = async () => {
  const note = new User({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const usersInDb = async () => {
  const notes = await User.find();
  return notes.map((u) => u.toJSON());
};

export default {
  getInitialUsers,
  initializeUsers,
  deleteUsers,
  nonExistingId,
  usersInDb,
};
