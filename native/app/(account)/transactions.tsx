import Button from 'components/Button';
import { Form, Input } from 'components/Form';
import Page from 'components/Page';
import ProgressBar from 'components/ProgressBar';
import TitleBar from 'components/TitleBar';
import Transaction from 'components/Transaction';
import { useFetch } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { search } from 'utils';
import schemas from 'utils/schemas';
import { InferType } from 'yup';

const schema = schemas.object({
  types: schemas.array().of(schemas.string()),
  keyword: schemas.string(),
});

function filter(transactions: Transaction[], { types, keyword }: InferType<typeof schema>) {
  return transactions
    .filter((transaction) =>
      types && types.length > 0
        ? types.some((type = '') => {
            const [$type, isIncome] = type.split(':');
            return transaction.type === $type && transaction.isIncome === !!isIncome;
          })
        : true,
    )
    .filter(({ info: { name, mobile, account = {} } }) =>
      keyword ? search([name, mobile ? `09${mobile}` : null, Object.values(account)], keyword) : true,
    );
}

export default function Transactions() {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const { data: transactions = [], isLoading } = useFetch<Transaction[]>('/transaction');

  const types = [
    { label: t('actions.send'), value: 'payment' },
    { label: t('actions.receive'), value: 'payment:income' },
    { label: t('topup'), value: 'topup' },
    { label: t('socialpay-to-banks'), value: 'bank' },
    { label: t('banks-to-socialpay'), value: 'bank:income' },
  ];

  return (
    <Form watch schema={schema} onSubmit={() => {}}>
      {({ values, setValue }) => {
        return (
          <Page unsafe className='dark:bg-slate-900'>
            <View
              style={{ paddingTop: top + 10 }}
              className='bg-white dark:bg-slate-800 border-b relative z-10 shadow-xl shadow-slate-400 dark:shadow-slate-800 border-slate-200 dark:border-slate-600'
            >
              <View className='px-4'>
                <TitleBar title={t('transactions')} />
                <Input name='keyword' variant='outline' placeholder={t('enter-name-or-number')} />
              </View>
              <ScrollView horizontal className='w-full' showsHorizontalScrollIndicator={false}>
                <View className='flex-row gap-x-1.5 px-4 py-2.5'>
                  {types.map(({ label, value }) => {
                    const { types = [] } = values;
                    const isActive = types.includes(value);
                    const handlePress = () => {
                      setValue('types', isActive ? types.filter((type) => type !== value) : [...types, value]);
                    };
                    return (
                      <Pressable
                        key={label}
                        onPress={handlePress}
                        className={`px-2 py-1 rounded-md border 
                        ${isActive ? 'bg-brand-600 border-brand-400 dark:border-brand-600' : 'border-slate-200 dark:border-slate-600'}`}
                      >
                        <Text
                          className={`text-xs font-sans-semibold ${
                            isActive ? 'text-white dark:text-slate-800' : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            {isLoading ? (
              <View className='flex-center flex-1'>
                <ProgressBar size='lg' />
              </View>
            ) : transactions.length === 0 ? (
              <View className='flex-center flex-1 px-4 space-y-2.5'>
                <Text className='font-sans-medium text-slate-600'>No transactions</Text>
                <Button label='Send money' href='/send' intent='outline' className='h-8' />
              </View>
            ) : (
              <FlatList
                data={filter(transactions, values)}
                extraData={values}
                className='flex-1 h-full'
                renderItem={({ item }) => <Transaction {...item} className='px-4 py-4 border-b' />}
                keyExtractor={(transactions) => transactions._id}
              />
            )}
          </Page>
        );
      }}
    </Form>
  );
}
