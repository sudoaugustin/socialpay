import Button from 'components/button';
import { Form, Input } from 'components/form';
import Image from 'components/image';
import MutateButton from 'components/mutate-button';
import { useFetch } from 'hooks/request';
import { request } from 'http';
import Account from 'layouts/account';
import schemas from 'utils/schemas';

const schema = schemas.object({
  keyword: schemas.string(),
});

type Bank = {
  _id: string;
  name: string;
  uid: {
    _id: string;
    name: string;
    mobile: string;
    secret: string;
    avatar: string;
    balance: number;
  };
  image: string;
  status: 'rejected' | 'verified' | 'pending';
  account: { holder: string; number: string };
};

const statusColor = { pending: 'text-slate-600', verified: 'text-green-600', rejected: 'text-error-600' };

export default function Home() {
  const { data: banks = [], mutate, isLoading } = useFetch<Bank[]>('/banks');

  return (
    <Account title='Bank accounts' className=''>
      <Form schema={schema}>
        {({ watch }) => {
          const { keyword = '' } = watch();
          return (
            <>
              <Input name='keyword' placeholder='Search user account' />
              <div className='grid grid-cols-3 gap-5 py-10 2xl:grid-cols-4'>
                {banks
                  .filter(({ name, account }) => `${name}${account.holder}${account.number}`.includes(keyword))
                  .map(({ _id, account, image, name, status }) => {
                    const url = `bank/${_id}`;
                    return (
                      <div key={_id} className='overflow-hidden bg-slate-50 border border-slate-100 h-80 rounded-lg'>
                        <div className='w-full h-40 relative rounded-t-lg overflow-hidden'>
                          <Image src={image} fill className='' />
                        </div>
                        <div className='p-2.5 text-center'>
                          <h2 className='text-lg font-bold'>
                            {name} - {account.number}
                          </h2>
                          <p className='my-1'>{account.holder}</p>
                          <p className={`uppercase font-bold ${statusColor[status]}`}>{status}</p>
                          <div className='flex space-x-2.5 mt-8'>
                            {(status === 'pending' || status === 'rejected') && (
                              <MutateButton
                                url={url}
                                size='sm'
                                label='Verify'
                                config={{ method: 'PUT', payload: { status: 'verified' } }}
                                onSuccess={() => mutate()}
                              />
                            )}
                            {(status === 'pending' || status === 'verified') && (
                              <MutateButton
                                url={url}
                                size='sm'
                                label='Reject'
                                intent='danger'
                                config={{ method: 'PUT', payload: { status: 'rejected' } }}
                                onSuccess={() => mutate()}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          );
        }}
      </Form>
    </Account>
  );
}
