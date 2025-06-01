import mongoConnection from './mongoConnection';
import memoryMongoConnection from './memoryMongoConnection';

const env = process.env.NODE_ENV || 'development';

const connectToDb = async (): Promise<void> => {
  if (env === 'test') {
    return memoryMongoConnection.connectToDb();
  }
  return mongoConnection.connectToDb();
};

const disconnectDb = async (): Promise<void> => {
  if (env === 'test') {
    return memoryMongoConnection.disconnectDb();
  }
  throw new Error('disconnectDb solo está disponible en test');
};

export default {
  connectToDb,
  disconnectDb,
};
