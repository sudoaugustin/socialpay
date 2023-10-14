import { Form, Submit } from 'components/Form';
import Field from 'components/Form/Field';
import Page from 'components/Page';
import TitleBar from 'components/TitleBar';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View, ViewProps } from 'react-native';
import { $toast } from 'stores/layout';
import schemas from 'utils/schemas';
import ContactInput from 'views/ContactInput';

const schema = schemas.object({ mobile: schemas.mobile, amount: schemas.amount });

const amounts = ['1000', '3000', '5000', '10000', '20000', '30000'];

function Amounts(props: ViewProps) {
  const { t } = useTranslation();
  return (
    <Field {...props} bare name='amount' label={t('select-amount')}>
      {({ value, setValue }) => (
        <View className='flex-row flex-wrap gap-2.5'>
          {amounts.map((amount) => {
            const isSelected = amount === value;
            return (
              <Pressable
                key={amount}
                onPress={() => setValue(amount)}
                className={`border flex-1 min-w-[30%] rounded-md px-4 py-2
                ${isSelected ? 'bg-brand-500 border-brand-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}
              >
                <Text className={`text-sm font-sans-bold ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                  {amount} Ks
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </Field>
  );
}

export default function Topup() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Page className='px-4'>
      <TitleBar title={t('services.topup')} />
      <Form
        url='/transaction'
        schema={schema}
        reshape={(values) => ({ ...values, type: 'topup' })}
        revalidates={['/user']}
        onError={({ status, message, setError }) => {
          status === 403 ? setError('amount', t('errors.insufficient-balance')) : $toast.set({ type: 'error', message });
        }}
        onSuccess={() => {
          router.replace('/home');
          $toast.set({ message: t('topup-success') });
        }}
      >
        {({ onSubmit }) => (
          <View className='py-5 space-y-5'>
            <ContactInput />
            <Amounts />
            <Submit label={t('actions.topup')} onSubmit={onSubmit} />
          </View>
        )}
      </Form>
    </Page>
  );
}
