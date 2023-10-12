import { Schema, model } from 'mongoose';

export default model(
  'Transaction',
  new Schema({
    type: {
      type: String,
      enum: ['bank', 'topup', 'payment'],
      default: 'payment',
    },
    note: String,
    date: {
      type: Date,
      default: Date.now,
    },
    payer: String,
    payee: String,
    amount: {
      type: Number,
      required: true,
    },
  }),
);
