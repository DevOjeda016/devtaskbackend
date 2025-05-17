import bcrypt from 'bcrypt';
import config from '../config/index.js';

const saltRound = config.SALT_ROUNDS;

export const hashPassword = (password) => bcrypt.hash(password, saltRound);

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);
