import { useStore } from '@nanostores/react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { $token } from 'stores';

export default function Index() {
  const token = useStore($token);
  const router = useRouter();

  useEffect(() => {
    if (token !== undefined) {
      router.replace(token ? '/home' : '/login');
    }
  }, [token]);

  return <Image source={require('assets/images/splash.png')} className='w-full h-full' />;
}
