import Button from 'components/Button';
import TransactionItem from 'components/Transaction';
import { useFetch } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function RecentTransactions() {
  const { t } = useTranslation();
  const { data: transactions = [], isLoading } = useFetch<Transaction[]>('/transaction', { payload: { limit: 5 } });

  return isLoading || transactions.length === 0 ? null : (
    <View className='py-5 px-4 space-y-5'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-sm font-sans-medium text-slate-600'>
          {t('recent')} {t('transactions')}
        </Text>
        <Button href='/transactions' label={t('actions.see-all')} intent='outline' className='p-0 h-6 bg-transparent' />
      </View>
      <View className='space-y-2.5'>
        {transactions.map((transaction) => {
          return (
            <TransactionItem
              key={transaction._id}
              {...transaction}
              className='shadow-lg shadow-slate-400 border border-slate-100 p-2 rounded-lg'
            />
          );
        })}
      </View>
    </View>
  );
}
