import Page from 'components/Page';
import ProgressBar from 'components/ProgressBar';
import { useEffect } from 'react';
import { $token } from 'stores';
import request from 'utils/request';

export default function Logout() {
  useEffect(() => {
    request('auth/logout')
      .catch(() => {})
      .finally(() => $token.set(null));
  }, []);

  return (
    <Page className='flex-center'>
      <ProgressBar size='lg' />
    </Page>
  );
}
