import User from './usersModel.js';

const findAll = async () => {
  const users = await User.find({});
  return users;
};

const create = async (user) => {
  const newUser = new User(user);
  const userSaved = await newUser.save();
  return userSaved;
};

const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateById = async (id, user) => {
  const userUpdated = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  return userUpdated;
};

const deleteById = async (id) => {
  const userDeleted = await User.findByIdAndDelete(id);
  return userDeleted;
};

export default {
  findAll,
  create,
  updateById,
  deleteById,
  findById,
};
