import { ReactNode } from 'react';

type Sheet = {
  title?: string;
  children: ReactNode;
  className?: string;
};

type Toast = {
  type?: 'normal' | 'error' | 'success';
  message: string;
};
