import { isValidObjectId } from 'mongoose';
import userService from './usersService.js';

const getAll = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const create = async (req, res) => {
  const userData = req.body;

  if (!userData) {
    res.status(400).json({ error: 'No se envió ninguna información' });
  }

  try {
    const userCreated = await userService.createUser(userData);
    return res.status(201).json(userCreated);
  } catch {
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  if (!userData) {
    return res.status(400).json({ error: 'No se envió ninguna información' });
  }

  try {
    const userUpdated = await userService.updateUser(id, userData);
    if (!userUpdated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(userUpdated);
  } catch {
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const userDeleted = await userService.deleteUser(id);
    if (!userDeleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch {
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export default {
  getAll,
  create,
  update,
  remove,
  findById,
};
