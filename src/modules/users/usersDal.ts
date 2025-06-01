import { IUserCreate, IUser, IUserUpdate } from './userTypes';
import User from './usersModel'


// Obtener todos los usuarios
const findAll = async (): Promise<IUser[]> => {
  return await User.find({});
};

// Crear un nuevo usuario
const create = async (user: IUserCreate): Promise<IUser> => {
  const newUser = new User(user);
  return await newUser.save();
};

// Buscar por ID
const findById = async (id: string): Promise<IUser | null> => 
  await User.findById(id);

// Buscar por username o email
const findByUsernameOrEmail = async (
  username: string,
  email: string
): Promise<IUser | null> => {
  return await User.findOne({
    $or: [{ username }, { email }],
  });
};

// Actualizar por ID
const updateById = async (
  id: string,
  user: IUserUpdate
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  });
};

// Eliminar por ID
const deleteById = async (id: string): Promise<IUser | null> => 
  await User.findByIdAndDelete(id);

export default {
  findAll,
  create,
  updateById,
  deleteById,
  findById,
  findByUsernameOrEmail,
};
