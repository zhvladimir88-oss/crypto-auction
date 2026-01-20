import { Schema, model } from 'mongoose';
export const Bid = model('Bid', new Schema({
  auctionId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  amount: Number,
  round: Number,
  createdAt: { type: Date, default: Date.now }
}));
