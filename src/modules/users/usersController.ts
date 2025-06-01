import { isValidObjectId } from 'mongoose';
import userService from './usersService';
import { missingFieldsError } from './usersErrors';
import { Request, Response, NextFunction } from 'express';
import { IUser, IUserRequest, IUserUpdate } from './userTypes';

const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requiredFields = ['username', 'email', 'password', 'name', 'lastname', 'role'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw missingFieldsError(missingFields);
    }

    const userData: IUserRequest = req.body

    const userCreated = await userService.createUser(userData);
    res.status(201).json(userCreated);
  } catch (err: unknown) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const userData: IUserRequest = req.body;

  if (!userData || Object.keys(userData).length === 0) {
    res.status(400).json({ error: 'No se envió ninguna información' });
    return;
  }

  try {
    const userUpdated = await userService.updateUser(id, userData);
    if (!userUpdated) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const userDeleted = await userService.deleteUser(id);
    if (!userDeleted) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const user = await userService.findUserById(id);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  create,
  update,
  remove,
  findById,
};
