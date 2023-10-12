import { Schema, model } from 'mongoose';

export default model(
  'Session',
  new Schema({
    uid: { ref: 'User', type: Schema.ObjectId, required: true },
    device: {
      IP: { type: String, required: true },
      OS: { type: String, required: true, enum: ['ios', 'android'] },
    },
    location: {
      city: { type: String, default: 'unknown' },
      country: { type: String, default: 'unknown' },
    },
  }),
);
