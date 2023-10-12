/// <reference types="nativewind/types" />

type Lang = 'en' | 'mm';

type User = { name: string; avatar: string; mobile: string; balance: number };

type Bank = {
  _id: string;
  name: 'CB' | 'AYA' | 'KBZ';
  status: 'pending' | 'verified' | 'rejected';
  account: {
    holder: string;
    number: string;
  };
};

type Transaction = {
  _id: string;
  date: string;
  type: 'bank' | 'topup' | 'payment';
  info: { name: string; mobile: string; avatar: string; account?: Bank['account'] };
  note: string;
  payer: string;
  payee: string;
  amount: string;
  isIncome: boolean;
};
