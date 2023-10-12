import Page from 'components/Page';
import useLogout from 'hooks/useLogout';
import ProgressBar from 'icons/ProgressBar';
import { useEffect } from 'react';

export default function Logout() {
  const handleLogout = useLogout();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Page className='flex-center'>
      <ProgressBar size='lg' />
    </Page>
  );
}
