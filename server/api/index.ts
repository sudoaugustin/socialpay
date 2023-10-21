import admin from '../routes/admin';
import auth from '../routes/auth';
import bank from '../routes/bank';
import session from '../routes/session';
import transaction from '../routes/transaction';
import user from '../routes/user';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect(process.env.MONGO_DB_URL as string)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('🤟 🤟 🤟').end();
});

app.use('/auth', auth);
app.use('/bank', bank);
app.use('/user', user);
app.use('/admin', admin);
app.use('/session', session);
app.use('/transaction', transaction);

app.listen(2500, () => console.log('Server Started'));
