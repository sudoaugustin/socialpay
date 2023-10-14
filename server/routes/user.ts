import Session from '../models/Session';
import Transaction from '../models/Transaction';
import User from '../models/User';
import { protect } from '../utils/middlewares';
import express from 'express';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const user = await User.findById(req.uid, { _id: 0, __v: 0, secret: 0 });
  user ? res.json(user).end() : res.status(404).end();
});

router.put('/', async (req, res) => {
  await User.findByIdAndUpdate(req.uid, req.body);
  res.end();
});

router.get('/exist', async (req, res) => {
  const user = await User.findOne({ mobile: req.query.mobile }, { _id: 0, name: 1, avatar: 1 });
  user ? res.json(user).end() : res.status(404).end();
});

router.get('/recent', async (req, res) => {
  const recipients = await Transaction.aggregate([
    { $match: { payer: req.uid } },
    { $sort: { date: -1 } },
    { $group: { _id: '$recipient' } },
    { $limit: 10 },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'info' } },
    { $unwind: '$info' },
    { $project: { 'info.name': 1, 'info.mobile': 1, 'info.avatar': 1 } },
  ]);

  res.json(recipients.map((recipients) => recipients.info)).end();
});

export default router;
