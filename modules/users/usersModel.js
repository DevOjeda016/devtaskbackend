import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  passwordHashed: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  projects: [
    {
      type: Schema.ObjectId,
      ref: 'Project',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const {
      _id, __v, password, ...rest
    } = ret;
    return {
      ...rest,
      id: _id.toString(),
    };
  },
});

export default mongoose.model('User', userSchema);
