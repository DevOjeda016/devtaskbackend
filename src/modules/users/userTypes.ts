import mongoose, { Document, Model, Types } from "mongoose";

// Roles permitidos
export type UserRole = 'admin' | 'user';

// Base común para usuarios
export interface IUserBase {
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: UserRole;
}

// Modelo completo guardado en la base de datos
export interface IUser extends IUserBase, Document{
  _id: Types.ObjectId
  passwordHashed: string;
  projects: mongoose.Types.ObjectId[];
}

// Payload esperado al registrar un usuario
export interface IUserRequest extends IUserBase {
  password: string;
  projects?: mongoose.Types.ObjectId[];
}

// Datos devueltos al cliente
export interface IUserResponse extends IUserBase {
  id: string;
  projects: mongoose.Types.ObjectId[];
}

export interface IUserCreate extends IUserBase {
  passwordHashed: string;
}

export interface IUserUpdate {
  name?: string;
  lastname?: string;
  username?: string;
  email?: string;
  role?: UserRole;
  passwordHashed?: string;
  projects?: mongoose.Types.ObjectId[];
}