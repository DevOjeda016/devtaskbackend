import mongoose from 'mongoose';
import config from '../config/index';

const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to Mongo DB');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error to connect to Mongo DB', error.message);
    } else {
      console.log('Unknown error connecting to Mongo DB')
    }
  }
};

export default {
  connectToDb,
};
