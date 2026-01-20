import { Schema, model, Document } from 'mongoose';
export interface IBid extends Document {
  userId: string;
  auctionId: string;
  amount: number;
  createdAt: Date;
}
const BidSchema = new Schema<IBid>({
  userId: String,
  auctionId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});
export const Bid = model<IBid>('Bid', BidSchema);
