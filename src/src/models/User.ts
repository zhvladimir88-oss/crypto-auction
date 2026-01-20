import { Schema, model } from 'mongoose';
export const User = model('User', new Schema({
  username: String,
  balance: { type: Number, default: 1000 },
  reserved: { type: Number, default: 0 }
}));
