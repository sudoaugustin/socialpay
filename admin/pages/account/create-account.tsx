import { Form, Input, Password, Submit } from 'components/form';
import Account from 'layouts/account';
import { toast } from 'sonner';
import schemas from 'utils/schemas';

const schema = schemas.object({
  name: schemas.name.required('Please enter admin name'),
  username: schemas.name.required("Please enter admin's username"),
  password: schemas.password.required('Please enter password'),
});

export default function CreateAccount() {
  return (
    <Account title='Create Account' className=''>
      <Form
        url='/create'
        schema={schema}
        className='space-y-10 max-w-sm mx-auto'
        onError={() => toast.error('Sorry something went wrong')}
        onSuccess={() => toast.success('Admin account created')}
      >
        <Input name='name' label='Admin Full Name' />
        <Input name='username' label='Admin Username' />
        <Password name='password' label='Admin Password' />
        <Submit label='Create account' />
      </Form>
    </Account>
  );
}
