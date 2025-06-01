import usersDal from './usersDal';
import { hashPassword } from '../../utils/encryption';
import { userAlreadyRegisteredError } from './usersErrors';
import { IUser, IUserRequest, IUserResponse, IUserCreate, IUserUpdate } from './userTypes';
import { toUserResponse } from './usersMapper';

const listUsers = async (): Promise<IUserResponse[]> => {
  const users = await usersDal.findAll()
  return users.map(u => toUserResponse(u))
};

const createUser = async (userData: IUserRequest): Promise<IUserResponse> => {

  const { password, ...rest } = userData;

  const existingUser = await usersDal.findByUsernameOrEmail(rest.username, rest.email);
  if (existingUser) {
    throw userAlreadyRegisteredError('Ya existe un usuario con ese nombre de usuario o correo electrónico');
  }

  const passwordHashed = await hashPassword(password);

  const userToCreate: IUserCreate = {
    ...rest,
    passwordHashed
  }

  const userCreated = await usersDal.create(userToCreate);
  return toUserResponse(userCreated)
};

const updateUser = async (id: string, userData: IUserRequest): Promise<IUserResponse | null> => {
  let userToUpdate: IUserUpdate;
  if (userData.password) {
    const { password, ...rest } = userData;
    const passwordHashed = await hashPassword(password);
    userToUpdate = { ...rest, passwordHashed };
  } else {
    userToUpdate = userData;
  }
  const user = await usersDal.updateById(id, userToUpdate);
  return user ? toUserResponse(user) : null;
}

const findUserById = async (id: string): Promise<IUserResponse | null> => {
  const user = await usersDal.findById(id);
  return user ? toUserResponse(user) : null;
};

const findUserByUsernameOrEmail = (username: string, email: string): Promise<IUser | null> =>
  usersDal.findByUsernameOrEmail(username, email);

const deleteUser = async (id: string): Promise<IUserResponse | null> => {
  const user = await usersDal.deleteById(id);
  return user ? toUserResponse(user) : null
}

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUserByUsernameOrEmail,
};
