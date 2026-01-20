import { Schema, model, Document } from 'mongoose';
export interface IAuction extends Document {
  itemId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'active' | 'finished';
  minBidStep: number;
  antiSnipingSeconds: number;
  currentHighestBid: number;
  currentLeaderUserId?: string;
}
const AuctionSchema = new Schema<IAuction>({
  itemId: String,
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ['scheduled','active','finished'], default: 'scheduled' },
  minBidStep: Number,
  antiSnipingSeconds: Number,
  currentHighestBid: { type: Number, default: 0 },
  currentLeaderUserId: String,
});
export const Auction = model<IAuction>('Auction', AuctionSchema);
