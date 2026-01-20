import { Router } from 'express';
import { AuctionService } from '../services/auction.service';
const r=Router();
r.post('/:id/bid',async(req,res)=>{
  try{res.json(await AuctionService.placeBid(req.params.id,req.body.userId,req.body.amount));}
  catch(e:any){res.status(400).json({error:e.message});}
});
export default r;
