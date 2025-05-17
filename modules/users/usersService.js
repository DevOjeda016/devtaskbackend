import authDal from './usersDal.js';

const listUsers = () => authDal.findAll();

const createUser = (userData) => authDal.create(userData);

const updateUser = (id, userData) => authDal.updateById(id, userData);

const deleteUser = (id) => authDal.deleteById(id);

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};
