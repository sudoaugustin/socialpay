import Button from 'components/Button';
import { Amount, Form, Input, Submit } from 'components/Form';
import ImagePicker from 'components/Form/ImagePicker';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { $user } from 'stores';
import { $popup, $toast } from 'stores/layout';
import { KeyedMutator } from 'swr';
import { astrikeNumber, getRandomValue } from 'utils';
import { banks } from 'utils/const';
import schemas from 'utils/schemas';

const $banks = Object.keys(banks);

const schema = schemas.object({
  name: schemas.string(),
  image: schemas.string().required('Please upload bank book'),
  accountHolder: schemas.name.required('Please enter account holder name').min(4, 'Minimum length is 4'),
  accountNumber: schemas
    .string()
    .required('Please enter account no')
    .when(['name'], function ([name], schema) {
      return schema.length(name === 'CB' ? 10 : name === 'KBZ' ? 17 : 11, 'Invalid account no');
    }),
});

type AddProps = {
  mutate: KeyedMutator<Bank[]>;
};

type RmvProps = {
  _id: string;
  name: typeof $banks[number];
  number: string;
  mutate: KeyedMutator<Bank[]>;
};

type TransferProps = Bank & {
  isDeposit: boolean;
};

export function AddBank({ mutate }: AddProps) {
  const { t } = useTranslation();
  return (
    <Form
      url='/bank'
      watch
      schema={schema}
      initial={{ name: $banks[0] }}
      reshape={({ accountHolder, accountNumber, ...rest }) => ({ ...rest, account: { holder: accountHolder, number: accountNumber } })}
      onError={({ status, message }) => $toast.set({ type: 'error', message: status === 409 ? t('bank-acc-already-inuse') : message })}
      onSuccess={() => {
        mutate();
        $popup.set(undefined);
      }}
    >
      {({ values, setValue, onSubmit }) => (
        <View className='pt-5 space-y-5'>
          <View className='flex-row gap-x-2.5'>
            {$banks.map((bank) => {
              const isSelected = bank === values.name;
              return (
                <Pressable
                  key={bank}
                  className={`py-1 rounded-lg flex-1 flex-center border 
                  ${isSelected ? 'bg-brand-100 border-brand-300' : 'border-slate-300'}`}
                  onPress={() => setValue('name', bank)}
                >
                  <Text className={`text-base font-sans-semibold ${isSelected ? 'text-brand-600' : 'text-slate-600'}`}>{bank}</Text>
                </Pressable>
              );
            })}
          </View>
          <Input name='accountNumber' label={t('bank-acc-number')} keyboardType='number-pad' />
          <Input name='accountHolder' label={t('bank-acc-holder')} />
          <ImagePicker
            name='image'
            label={t('upload-bank-book')}
            aspect={[16, 9]}
            className='h-40 rounded-lg overflow-hidden bg-slate-100 border border-slate-200'
          />
          <Submit label={t('actions.connect')} onSubmit={onSubmit} />
        </View>
      )}
    </Form>
  );
}

export function RmvBank({ _id, name, number, mutate }: RmvProps) {
  const { t } = useTranslation();
  return (
    <Form
      url='/bank'
      schema={schemas.object()}
      config={{ method: 'DELETE' }}
      initial={{ id: _id }}
      onSuccess={() => {
        mutate();
        $popup.set(undefined);
      }}
    >
      {({ onSubmit }) => (
        <View className='pt-5 space-y-5'>
          <Text className='text-base font-sans-medium'>{t('remove-bank-acc-desc').replace('$acc', `${name}-${number}`)}</Text>
          <View className='flex-row gap-x-2.5'>
            <Button label={t('actions.no')} intent='outline' className='flex-1' onPress={() => $popup.set(undefined)} />
            <Submit label={t('actions.yes')} className='flex-1' onSubmit={onSubmit} />
          </View>
        </View>
      )}
    </Form>
  );
}

export function TransferBank({ name, account, isDeposit }: TransferProps) {
  const { t } = useTranslation();
  const balance = isDeposit ? $user.get()?.balance || 0 : getRandomValue(750000, 2500000);

  return (
    <View>
      <View className='flex-row items-end justify-between py-5'>
        <View className='items-center flex-row gap-x-2.5'>
          <Image source={banks[name].image} className='w-10 h-10 bg-slate-200 rounded-full' />
          <View>
            <Text className='font-sans-bold text-slate-600 text-base'>{account.holder}</Text>
            <Text className='font-sans-medium text-slate-400'>{astrikeNumber(account.number)}</Text>
          </View>
        </View>
        <View>
          <Text className='text-xs font-sans-semibold text-slate-600 text-right'>{t('balance')}</Text>
          <Text className='text-base font-sans-extrabold text-right'>{balance} Ks</Text>
        </View>
      </View>
      <Form
        url='transaction/bank'
        schema={schemas.object({ amount: schemas.amount.max(balance, 'Insufficient balance') })}
        reshape={(values) => ({ ...values, isDeposit, accountNumber: account.number })}
        revalidates={['/user']}
        onSuccess={({ values }) => {
          $popup.set(undefined);
          $toast.set({
            message: t(isDeposit ? 'socialpay-to-bank-success' : 'bank-to-socialpay-success')
              .replace('$bank', name)
              .replace('$amount', values.amount.toString()),
          });
        }}
      >
        {({ onSubmit }) => (
          <View className='space-y-2.5'>
            <Amount name='amount' label={t('amount')} />
            <Submit label={isDeposit ? t('actions.deposit') : t('actions.withdraw')} onSubmit={onSubmit} />
          </View>
        )}
      </Form>
    </View>
  );
}
