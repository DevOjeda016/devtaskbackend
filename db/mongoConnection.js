import mongoose from 'mongoose';
import config from '../config/index.js';

const connectToDb = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to Mongo DB');
  } catch (error) {
    console.log('Error to connect to Mongo DB', error.message);
  }
};

export default {
  connectToDb,
};
