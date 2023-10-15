import 'dotenv/config';
import Bank from './models/Bank';
import Session from './models/Session';
import Transaction from './models/Transaction';
import User from './models/User';
import mongoose, { Types } from 'mongoose';
import speakeasy from 'speakeasy';

const users = [
  {
    _id: new Types.ObjectId(),
    name: 'Hlaing Min Aung',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000001',
    avatar:
      'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 5100000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Su Myat Noe',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000002',
    avatar:
      'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 4800000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Thet Naing',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000003',
    avatar:
      'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 1200000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'May Zin Oo',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000004',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 21500000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Kyaw Htet Aung',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000005',
    avatar:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 20000000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Nandar Hlaing',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000006',
    avatar:
      'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 75000000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Yan Naing Soe',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000007',
    avatar:
      'https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 1305000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Mya Thandar',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000008',
    avatar:
      'https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 5000,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Ko Ko Aung',
    secret: speakeasy.generateSecret().base32,
    mobile: '7800009',
    avatar:
      'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 4001100,
  },
  {
    _id: new Types.ObjectId(),
    name: 'Thiri Hlaing',
    secret: speakeasy.generateSecret().base32,
    mobile: '78000010',
    avatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    balance: 5601600,
  },
];

const banks = [
  {
    _id: new Types.ObjectId(),
    uid: users[0]._id,
    name: 'CB',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'rejected',
    account: {
      holder: 'Aung Bo Bo Tun',
      number: '1234567890',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[0]._id,
    name: 'AYA',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'verified',
    account: {
      holder: 'Augustin Joseph',
      number: '12345678901',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[0]._id,
    name: 'KBZ',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    account: {
      holder: 'Aung Bo Bo Tun',
      number: '12345678901234567',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[1]._id,
    name: 'CB',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'rejected',
    account: {
      holder: 'Myo Kyaw Oo',
      number: '0987654321',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[2]._id,
    name: 'KBZ',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'verified',
    account: {
      holder: 'Myo Kyaw Oo',
      number: '76543210987654321',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[3]._id,
    name: 'CB',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'verified',
    account: {
      holder: 'Thiri Naung Cho',
      number: '456789012345',
    },
  },
  {
    _id: new Types.ObjectId(),
    uid: users[4]._id,
    name: 'AYA',
    image:
      'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    status: 'verified',
    account: {
      holder: 'Pyone Cho Cho',
      number: '45678923456',
    },
  },
];

const transactions = [
  {
    type: 'payment',
    amount: 15000,
    payer: users[2]._id,
    payee: users[3]._id,
  },
  {
    type: 'payment',
    amount: 15000,
    payer: users[0]._id,
    payee: users[1]._id,
  },
  {
    type: 'bank',
    amount: 750000,
    payer: banks[1].account.number,
    payee: users[0]._id,
  },
  {
    type: 'bank',
    amount: 85000,
    payer: users[0]._id,
    payee: banks[1].account.number,
  },
  {
    type: 'topup',
    amount: 15000,
    payer: users[0]._id,
    payee: users[2].mobile,
  },
  {
    type: 'topup',
    amount: 5000,
    payer: users[3]._id,
    payee: users[2].mobile,
  },
  {
    type: 'payment',
    amount: 7500,
    payer: users[1]._id,
    payee: users[5]._id,
  },
  {
    type: 'topup',
    amount: 3000,
    payer: users[5]._id,
    payee: users[2].mobile,
  },
  {
    type: 'topup',
    amount: 5000,
    payer: users[0]._id,
    payee: users[0].mobile,
  },
  {
    type: 'topup',
    amount: 1000,
    payer: users[1]._id,
    payee: users[0].mobile,
  },
  {
    type: 'payment',
    amount: 7500,
    payer: users[2]._id,
    payee: users[1]._id,
  },
  {
    type: 'payment',
    amount: 5000,
    payer: users[6]._id,
    payee: users[7]._id,
  },
  {
    type: 'payment',
    amount: 10300,
    payer: users[5]._id,
    payee: users[0]._id,
  },
  {
    type: 'payment',
    amount: 6000,
    payer: users[3]._id,
    payee: users[0]._id,
  },
  {
    type: 'payment',
    amount: 6000,
    payer: users[6]._id,
    payee: users[1]._id,
  },
  {
    type: 'payment',
    amount: 10000,
    payer: users[7]._id,
    payee: users[6]._id,
  },
  {
    type: 'payment',
    amount: 40000,
    payer: users[9]._id,
    payee: users[8]._id,
  },
  {
    type: 'payment',
    amount: 25000,
    payer: users[1]._id,
    payee: users[2]._id,
  },
  {
    type: 'payment',
    amount: 4500,
    payer: users[7]._id,
    payee: users[8]._id,
  },
  {
    type: 'payment',
    amount: 7000,
    payer: users[2]._id,
    payee: users[0]._id,
  },
  {
    type: 'payment',
    amount: 40000,
    payer: users[0]._id,
    payee: users[8]._id,
  },
  {
    type: 'payment',
    amount: 7000,
    payer: users[6]._id,
    payee: users[0]._id,
  },
  {
    type: 'payment',
    amount: 4500,
    payer: users[0]._id,
    payee: users[7]._id,
  },
];

mongoose
  .connect(process.env.MONGO_DB_URL as string)
  .then(async () => {
    console.log('DB Connected');

    await User.deleteMany();
    await Bank.deleteMany();
    await Session.deleteMany();
    await Transaction.deleteMany();
    console.log('DB Purged');

    await Bank.create(banks);
    await User.create(users);
    await Transaction.create(transactions);
    console.log('DB Seeded');

    process.exit()
  })
  .catch((err) => console.log(err));
