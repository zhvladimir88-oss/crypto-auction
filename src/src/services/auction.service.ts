import { Auction } from '../models/Auction';
import { Bid } from '../models/Bid';
import { User } from '../models/User';

export class AuctionService {
  static async placeBid(auctionId:string,userId:string,amount:number){
    const auction=await Auction.findById(auctionId);
    if(!auction||!auction.active)throw new Error('Closed');
    const user=await User.findById(userId);
    if(!user||user.balance-user.reserved<amount)throw new Error('No funds');
    user.reserved+=amount;await user.save();
    return await Bid.create({auctionId,userId,amount,round:auction.currentRound});
  }
}
