import User from './usersModel';
import { hashPassword } from '../../utils/encryption';
import { IUser, IUserCreate } from './userTypes';

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

const initializeUsers = async (): Promise<void> => {
  const users = await getInitialUsers();
  await User.insertMany(users);
};

const deleteUsers = async (): Promise<void> => {
  await User.deleteMany({});
};

const nonExistingId = async (): Promise<string> => {
  const passwordHashed = await hashPassword('PassSeguro123*')
  const userData: IUserCreate = {
      name: 'nameTemp',
      lastname: 'lastnameTemp',
      username: 'username.temp',
      passwordHashed,
      email: 'temp@example.com',
      role: 'user'
  }
  const user = new User(userData);
  await user.save();
  await user.deleteOne();

  return user._id.toString();
};

const usersInDb = async (): Promise<IUser[]> => {
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
