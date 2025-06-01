import mongoose, { Model, Types } from 'mongoose';
import { IUser } from './userTypes';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHashed: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user'],
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      default: [],
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const {
      __v, ...rest
    } = ret;
    return {
      ...rest
    };
  },
});

const UserModel: Model<IUser> = mongoose.model('User', userSchema);
export default UserModel
