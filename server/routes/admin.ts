import Admin from '../models/Admin';
import AdminSession from '../models/AdminSession';
import Bank from '../models/Bank';
import { adminProtect } from '../utils/middlewares';
import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const router = express.Router();

router.use(cors());

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    const isPasswordMatch = await bcrypt.compare(password, admin.password as string);

    if (!isPasswordMatch) return res.status(401).end();
    const session = await new AdminSession({ uid: admin.id }).save();

    res.json({ token: session._id }).end();
  } else {
    res.status(404).end();
  }
});

router.post('/logout', adminProtect, async (req, res) => {
  await AdminSession.findByIdAndDelete(req.headers.authorization);
  res.end();
});

router.post('/create', adminProtect, async (req, res) => {
  await new Admin(req.body).save();
  res.end();
});

router.get('/', adminProtect, async (req, res) => {
  const admin = await Admin.findById(req.uid, { _id: 0, password: 0 });

  if (admin) {
    res.json(admin).end();
  } else {
    res.status(404).end();
  }
});

router.put('/', adminProtect, async (req, res) => {
  await Admin.findByIdAndUpdate(req.uid, req.body);
  res.end();
});

router.get('/banks', adminProtect, async (req, res) => {
  const banks = await Bank.find();
  res.json(banks).end();
});

router.put('/bank/:id', adminProtect, async (req, res) => {
  await Bank.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status });
  res.status(200).end();
});

export default router;
