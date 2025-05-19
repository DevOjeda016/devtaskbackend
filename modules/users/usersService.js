import usersDal from './usersDal.js';
import { hashPassword } from '../../utils/encryption.js';
import { userAlreadyRegisteredError } from './usersErrors.js';

const listUsers = () => usersDal.findAll();

const createUser = async (userData) => {
  const { password, email, username } = userData;

  const existingUser = usersDal.findByUsernameOrEmail(username, email);
  if (existingUser) {
    throw userAlreadyRegisteredError('Ya existe un usuario con ese nombre de usuario o correo electrónico');
  }

  const passwordHashed = await hashPassword(password);
  const userToCreate = {
    ...userData,
    passwordHashed,
  };

  delete userToCreate.password;

  return usersDal.create(userToCreate);
};

const updateUser = (id, userData) => usersDal.updateById(id, userData);

const findUserById = (id) => usersDal.findById(id);

const findUserByUsernameOrEmail = (username, email) => usersDal
  .findByUsernameOrEmail({ username, email });

const deleteUser = (id) => usersDal.deleteById(id);

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUserByUsernameOrEmail,
};
