import mongoConnection from './mongoConnection.js';
import memoryMongoConnection from './memoryMongoConnection.js';

const env = process.env.NODE_ENV || 'development';

const connectToDb = async () => {
  if (env === 'test') {
    return memoryMongoConnection.connectToDb();
  }
  return mongoConnection.connectToDb();
};

const disconnectDb = async () => {
  if (env === 'test') {
    return memoryMongoConnection.disconnectDb();
  }
  throw new Error('disconnectDb solo está disponible en test');
};

export default {
  connectToDb,
  disconnectDb,
};
