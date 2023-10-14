import TransactionDetail from './TransactionDetail';
import Avatar from 'components/Avatar';
import { Image } from 'expo-image';
import { Topup } from 'icons/Transaction';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { $sheet } from 'stores/layout';
import { formatDate, formatMobile } from 'utils';
import { banks } from 'utils/const';

export default function Transaction({ _id, note, info, type, date, amount, payer, payee, isIncome, ...rest }: Transaction & ViewProps) {
  const [isPressIn, setPressIn] = useState(false);
  const { name, avatar, mobile, account } = info;

  return (
    <Pressable
      {...rest}
      className={`flex-row justify-between items-center border-slate-100 dark:border-slate-800 
      ${isPressIn ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'}`}
      onPress={() =>
        $sheet.set({
          children: (
            <TransactionDetail
              _id={_id}
              date={date}
              type={type}
              note={note}
              info={info}
              payer={payer}
              payee={payee}
              amount={amount}
              isIncome={isIncome}
            />
          ),
        })
      }
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
    >
      <View className='w-10 h-10 flex-center bg-brand-50 dark:bg-brand-950 rounded-full'>
        {type === 'bank' ? (
          <Image source={banks[name as Bank['name']].image} className='w-8 h-8' contentFit='contain' />
        ) : type === 'topup' ? (
          <Topup className='w-6 h-6 fill-none stroke-brand-500' />
        ) : (
          <Avatar name={name} source={avatar} size='sm' />
        )}
      </View>
      <View className='px-2 flex-1'>
        <Text className='text-sm text-slate-800 dark:text-slate-200 font-sans-bold'>{account?.holder || name || formatMobile(mobile)}</Text>
        <Text className='text-xs text-slate-400 dark:text-slate-600 font-sans-medium mt-0.5'>{formatDate(date, "MMM dd '•' hh:mm a")}</Text>
      </View>
      <Text
        className={`text-base text-right font-sans-extrabold 
        ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
      >
        {isIncome ? '+' : '-'} {amount} Ks
      </Text>
    </Pressable>
  );
}
