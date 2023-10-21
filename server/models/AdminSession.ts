import { Schema, model } from 'mongoose';

export default model(
  'AdminSession',
  new Schema({
    uid: { ref: 'Admin', type: Schema.ObjectId, required: true },
    date: {
      type: Date,
      default: Date.now,
    },
  }),
);
