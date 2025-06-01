import 'dotenv/config';

const requireEnv = (name: string): string  => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Enviroment variable ${name} is not defined`);
  }
  return value
}

const PORT = parseInt(requireEnv('PORT'), 10);
const MONGODB_URI = requireEnv('MONGODB_URI');
const SALT_ROUNDS = parseInt(requireEnv('SALT_ROUNDS'), 10);

export default {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
};
