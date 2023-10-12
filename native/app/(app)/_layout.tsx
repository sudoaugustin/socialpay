import { useStore } from '@nanostores/react';
import { Slot } from 'expo-router';
import { useFetch } from 'hooks/useQuery';
import { $token, $user } from 'stores';
import 'utils/i18n';

export default function RootLayout() {
  const token = useStore($token);

  useFetch('/user', {}, { enable: !!token, onSuccess: $user.set });

  return <Slot />;
}
