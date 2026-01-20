import { Schema, model } from 'mongoose';
export const Auction = model('Auction', new Schema({
  title: String,
  itemCount: Number,
  winnersPerRound: Number,
  roundDuration: Number,
  currentRound: { type: Number, default: 1 },
  roundEndsAt: Date,
  active: { type: Boolean, default: true }
}));
