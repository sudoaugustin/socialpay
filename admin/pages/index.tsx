import { useStore } from '@nanostores/react';
import { Form, Input, Password, Submit } from 'components/form';
import Page from 'components/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { $token } from 'stores';
import schemas from 'utils/schemas';

const schema = schemas.object({
  username: schemas.name.required('Please enter username'),
  password: schemas.password.required('Please enter password'),
});

export default function Login() {
  const token = useStore($token);
  const router = useRouter();

  useEffect(() => {
    token && router.push('/account/banks');
  }, [token]);

  return (
    <Page title='Login'>
      <div className='min-h-screen p-10 space-y-8 flex flex-col flex-center w-screen h-screen'>
        <h1 className='text-lg text-center font-bold uppercase'>Admin Login</h1>
        <Form
          url='/login'
          schema={schema}
          className='space-y-10 w-full max-w-sm'
          onError={({ status, message, setError }) => {
            if (status === 404) setError('username', 'User not found');
            else if (status === 401) setError('password', 'Wrong password');
            else toast.error(message);
          }}
          onSuccess={({ data }) => $token.set(data.token)}
        >
          <Input name='username' label='Username' />
          <Password name='password' label='Password' />
          <Submit label='Login' />
        </Form>
      </div>
    </Page>
  );
}
