import { Auction } from '../models/auction.model';
import { User } from '../models/user.model';
import { Bid } from '../models/bid.model';
import mongoose from 'mongoose';
export async function placeBid(userId: string, auctionId: string, amount: number) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const auction = await Auction.findById(auctionId).session(session);
    const user = await User.findById(userId).session(session);
    if (!auction || !user) throw new Error('Auction/User not found');
    if (auction.status !== 'active') throw new Error('Auction not active');
    if (amount < auction.currentHighestBid + auction.minBidStep) throw new Error('Bid too low');
    if (user.balance < amount) throw new Error('Insufficient balance');
    const now = new Date();
    if ((auction.endTime.getTime() - now.getTime()) / 1000 < auction.antiSnipingSeconds) {
      auction.endTime = new Date(auction.endTime.getTime() + auction.antiSnipingSeconds * 1000);
    }
    user.balance -= amount;
    user.frozenBalance += amount;
    if (auction.currentLeaderUserId) {
      const prevLeader = await User.findById(auction.currentLeaderUserId).session(session);
      if (prevLeader) {
        prevLeader.balance += auction.currentHighestBid;
        prevLeader.frozenBalance -= auction.currentHighestBid;
        await prevLeader.save({ session });
      }
    }
    auction.currentHighestBid = amount;
    auction.currentLeaderUserId = userId;
    await auction.save({ session });
    await user.save({ session });
    const bid = new Bid({ userId, auctionId, amount });
    await bid.save({ session });
    await session.commitTransaction();
    return { success: true, auction, bid };
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}
