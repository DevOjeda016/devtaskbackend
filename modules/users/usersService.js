import authDal from './usersDal.js';
import { hashPassword } from '../../utils/encryption.js';

const listUsers = () => authDal.findAll();

const createUser = async (userData) => {
  const { password, ...rest } = userData;
  const passwordHashed = await hashPassword(password);
  const userToCreate = {
    ...rest,
    passwordHashed,
  };
  return authDal.create(userToCreate);
};

const updateUser = (id, userData) => authDal.updateById(id, userData);

const findUserById = (id) => authDal.findById(id);

const deleteUser = (id) => authDal.deleteById(id);

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
};
