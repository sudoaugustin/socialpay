import Session from '../models/Session';
import { protect } from '../utils/middlewares';
import express from 'express';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const sessions = await Session.find({ uid: req.uid }, { uid: 0 }).sort('-date');
  res.json(sessions).end();
});

router.delete('/:id', async (req, res) => {
  await Session.deleteOne({ _id: req.params.id, uid: req.uid });
  res.status(200).end();
});

export default router;
