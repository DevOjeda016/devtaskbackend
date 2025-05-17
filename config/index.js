import 'dotenv/config';

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

export default {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
};
