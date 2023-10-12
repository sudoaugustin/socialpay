import { useRouter } from 'expo-router';
import { $token, $user } from 'stores';
import request from 'utils/request';

export default function useLogout() {
  const router = useRouter();

  return () => {
    request('auth/logout')
      .catch(() => {})
      .finally(() => {
        $user.set(undefined);
        $token.set(null);
        router.replace('/');
      });
  };
}
