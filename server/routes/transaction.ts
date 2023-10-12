import Bank from '../models/Bank';
import Transaction from '../models/Transaction';
import User from '../models/User';
import { topupMobile } from '../utils';
import { protect } from '../utils/middlewares';
import express from 'express';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const { limit = Infinity } = req.query;

  const transactions = await Transaction.find({ $or: [{ payer: req.uid }, { payee: req.uid }] })
    .sort('-date')
    .limit(Number(limit))
    .lean();

  const $transactions = (
    await Promise.allSettled(
      transactions.map(async (transaction) => {
        const isIncome = transaction.payee === req.uid;
        const participantId = transaction[isIncome ? 'payer' : 'payee'];

        return {
          info:
            transaction.type === 'topup'
              ? { mobile: transaction.payee }
              : transaction.type === 'bank'
              ? await Bank.findOne({ 'account.number': participantId }, { account: 1, name: 1 })
              : transaction.type === 'payment'
              ? await User.findById(participantId, { _id: 0, name: 1, avatar: 1, mobile: 1 })
              : null,
          isIncome,
          ...transaction,
        };
      }),
    )
  ).map((response: any) => response.value);

  res.json($transactions).end();
});

router.post('/', async (req, res) => {
  const user = await User.findById(req.uid);
  const { type, note, mobile, amount } = req.body;

  if (user) {
    const isTopup = type === 'topup';

    if (user.balance < amount) return res.status(403).end();

    user.balance -= amount;

    await user.save();
    const payee = isTopup ? await topupMobile(mobile) : await User.findOneAndUpdate({ mobile }, { $inc: { balance: +amount } });

    const transaction = new Transaction({ type, note, amount, payer: user._id, payee: isTopup ? mobile : payee?._id });
    await transaction.save();

    res.json({ id: transaction._id, date: transaction.date }).end();
  }
});

router.post('/bank', async (req, res) => {
  const { amount, isDeposit, accountNumber } = req.body;
  await Transaction.create({
    type: 'bank',
    amount,
    payer: isDeposit ? req.uid : accountNumber,
    payee: isDeposit ? accountNumber : req.uid,
  });

  res.status(200).end();
});

export default router;
