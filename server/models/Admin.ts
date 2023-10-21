import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

export default model(
  'Admin',
  new Schema({
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      set: (v: string) => bcrypt.hashSync(v, 10),
      minlength: 8,
    },
  }),
);
