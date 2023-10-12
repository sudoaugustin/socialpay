import Bank from '../models/Bank';
import { protect } from '../utils/middlewares';
import bodyParser from 'body-parser';
import express from 'express';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const banks = await Bank.find({ uid: req.uid }, { uid: 0, image: 0 });
  res.json(banks).end();
});

router.post('/', async (req, res) => {
  const { name, image, account } = req.body;

  Bank.create({ uid: req.uid, image, name, account })
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(error.code === 11000 ? 409 : 500).end();
    });
});

router.delete('/', async (req, res) => {
  const { id } = req.body;

  Bank.findByIdAndDelete(id)
    .then(() => {
      res.status(200).end();
    })
    .catch(() => {
      res.status(500).end();
    });
});

export default router;
