import { Router } from 'express';
import { placeBid } from '../services/auction.service';
const router = Router();
router.post('/auction/:id/bid', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const result = await placeBid(userId, req.params.id, amount);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
export default router;
