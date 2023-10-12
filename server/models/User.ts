import { Schema, model } from 'mongoose';

export default model(
  'User',
  new Schema({
    name: String,
    email: String,
    mobile: {
      type: String,
      unique: true,
      require: true,
    },
    secret: {
      type: String,
      require: true,
    },
    avatar: String,
    balance: {
      type: Number,
      default: 0,
    },
  }),
);
