import { Schema, model } from 'mongoose';

export default model(
  'Bank',
  new Schema({
    uid: {
      ref: 'User',
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      enum: ['CB', 'AYA', 'KBZ'],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    account: {
      holder: { type: String, required: true },
      number: { type: String, unique: true, required: true },
    },
  }),
);
