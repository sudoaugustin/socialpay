import SaveAndShare from '../views/SaveAndShare';
import Avatar from 'components/Avatar';
import { Image } from 'expo-image';
import { Topup } from 'icons/Transaction';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { astrikeNumber, formatDate, formatMobile } from 'utils';
import { banks } from 'utils/const';

export default function TransactionDetail({ _id, type, note, date, info, amount, isIncome }: Transaction) {
  const ref = useRef<View>(null);
  const { t } = useTranslation();
  const { name, avatar, mobile, account } = info;

  return (
    <View>
      <View ref={ref} collapsable={false} className='p-2 -mx-2'>
        <View className='w-20 h-20 mx-auto flex-center bg-brand-50 dark:bg-brand-950 rounded-full'>
          {type === 'bank' ? (
            <Image source={banks[name as Bank['name']].image} className='w-12 h-12' contentFit='contain' />
          ) : type === 'topup' ? (
            <Topup className='w-10 h-10 fill-none stroke-brand-500' />
          ) : (
            <Avatar name={name} source={avatar} size='lg' />
          )}
        </View>
        <View className='pt-2.5 pb-5 items-center'>
          <Text className='text-lg text-slate-950 dark:text-slate-50 font-sans-extrabold'>
            {type === 'topup' ? formatMobile(mobile) : account?.holder || name}
          </Text>
          {type !== 'topup' && (
            <Text className='text-base text-slate-800 dark:text-slate-200 font-sans-semibold'>
              {formatMobile(mobile) || astrikeNumber(account?.number as string)}
            </Text>
          )}
          <Text
            className={`text-xl mt-2.5 font-sans-extrabold 
            ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
          >
            {isIncome ? '+' : '-'} {amount} Ks
          </Text>
        </View>
        <View className='px-5 py-2.5 border rounded-md bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'>
          <View className='py-4 gap-y-0.5'>
            <Text className='text-slate-600 dark:text-slate-400 font-sans-semibold'>{t('date-and-time')}</Text>
            <Text className='text-slate-800 dark:text-slate-200 font-sans-extrabold'>{formatDate(date)}</Text>
          </View>
          <View className='py-4 gap-y-0.5 border-y border-dashed border-slate-300 dark:border-slate-700'>
            <Text className='text-slate-600 dark:text-slate-400 font-sans-semibold'>{t('transaction-id')}</Text>
            <Text className='text-slate-800 dark:text-slate-200 font-sans-extrabold'>{_id}</Text>
          </View>
          <View className='py-4 gap-y-0.5'>
            <Text className='text-slate-600 dark:text-slate-400 font-sans-semibold'>{t('note')}</Text>
            <Text className='text-slate-800 dark:text-slate-200 font-sans-semibold'>{note || 'xxxxxxxxxxxx'}</Text>
          </View>
        </View>
      </View>
      <SaveAndShare viewRef={ref} filename={_id} className='mt-2.5' />
    </View>
  );
}
