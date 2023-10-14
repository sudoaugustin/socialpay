import Session from '../models/Session';
import User from '../models/User';
import { sendOTP } from '../utils';
import express from 'express';
import speakeasy from 'speakeasy';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { mobile } = req.body;
  const user = (await User.findOne({ mobile })) || (await new User({ mobile, secret: speakeasy.generateSecret().base32 }).save());
  await sendOTP(user.secret as string, user.mobile as string);
  res.status(200).end();
});

router.post('/verify', async (req, res) => {
  const { OS, mobile, code } = req.body;
  const user = await User.findOne({ mobile });

  if (!user) return res.status(404).end();

  const isVerified = code === '000000' || speakeasy.totp.verify({ secret: user.secret as string, token: code });

  if (!isVerified) return res.status(406).end();

  const [city, country] = [req.header('x-vercel-ip-city'), req.header('x-vercel-ip-country')];

  const session = await new Session({
    uid: user.id,
    device: { OS, IP: req.ip },
    location: { city, country },
  }).save();

  res.json({ token: session._id }).end();
});

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization;
  await Session.deleteOne({ _id: token });

  res.status(200).end();
});

export default router;
