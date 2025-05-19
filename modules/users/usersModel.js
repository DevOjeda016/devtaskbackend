import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
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
      type: Schema.ObjectId,
      ref: 'Project',
      default: [],
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const {
      _id, __v, password, passwordHashed, ...rest
    } = ret;
    return {
      ...rest,
      id: _id.toString(),
    };
  },
});

export default mongoose.model('User', userSchema);
