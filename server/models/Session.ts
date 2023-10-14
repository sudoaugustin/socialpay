import { Schema, model } from 'mongoose';

export default model(
  'Session',
  new Schema({
    uid: { ref: 'User', type: Schema.ObjectId, required: true },
    date: {
      type: Date,
      default: Date.now,
    },
    device: {
      IP: { type: String, required: true },
      OS: { type: String, default: 'Unknown' },
    },
    location: {
      city: { type: String, default: 'unknown' },
      country: { type: String, default: 'unknown' },
    },
  }),
);
