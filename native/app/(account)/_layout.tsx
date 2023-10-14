import { useStore } from '@nanostores/react';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { $token } from 'stores';

export default function RootLayout() {
  const token = useStore($token);
  const router = useRouter();

  useEffect(() => {
    token !== undefined && !token && router.replace('/login');
  }, [token]);

  return <Slot />;
}
