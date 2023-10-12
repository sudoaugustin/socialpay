import { ReactNode } from 'react';

type Popup = {
  title?: string;
  children: ReactNode;
  className?: string;
};

type Toast = {
  type?: 'normal' | 'error' | 'success';
  message: string;
};
