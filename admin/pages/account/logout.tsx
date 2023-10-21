import { ProgressBar } from 'icons/loading';
import Account from 'layouts/account';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { $token } from 'stores';
import request from 'utils/request';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    request('/logout')
      .catch(() => {})
      .finally(() => {
        $token.set('');
        router.push('/');
      });
  }, []);

  return (
    <Account title='Logout'>
      <section className='flex flex-center w-full h-full'>
        <ProgressBar className='text-5xl text-brand-600' />
      </section>
    </Account>
  );
}
