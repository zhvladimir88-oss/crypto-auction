import express from 'express';
import mongoose from 'mongoose';
import auctionRoutes from './routes/auction.routes';
const app = express();
app.use(express.json());
app.use('/api', auctionRoutes);
mongoose.connect('mongodb://localhost:27017/crypto-auction');
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
