import bcrypt from 'bcrypt';
import config from '../config/index';

const saltRound = config.SALT_ROUNDS;

export const hashPassword = (password: string) => bcrypt.hash(password, saltRound);

export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);
