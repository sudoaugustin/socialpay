import TransactionDetail from './TransactionDetail';
import Avatar from 'components/Avatar';
import { Image } from 'expo-image';
import { Topup } from 'icons/Services';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { $popup } from 'stores/layout';
import { formatDate, formatMobile } from 'utils';
import { banks } from 'utils/const';

export default function TransactionItem({ _id, note, info, type, date, amount, payer, payee, isIncome, ...rest }: Transaction & ViewProps) {
  const [isPressIn, setPressIn] = useState(false);
  const { name, avatar, mobile, account } = info;

  return (
    <Pressable
      {...rest}
      className={`flex-row justify-between items-center ${isPressIn ? 'bg-slate-50' : 'bg-white'}`}
      onPress={() =>
        $popup.set({
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
      <View className='w-10 h-10 flex-center bg-brand-50 rounded-full'>
        {type === 'bank' ? (
          <Image source={banks[name as Bank['name']].image} className='w-8 h-8' />
        ) : type === 'topup' ? (
          <Topup className='w-6 h-6 fill-none stroke-brand-500' />
        ) : (
          <Avatar name={name} source={avatar} size='sm' />
        )}
      </View>
      <View className='px-2 flex-1'>
        <Text className='text-sm text-slate-800 font-sans-bold'>{account?.holder || name || formatMobile(mobile)}</Text>
        <Text className='text-xs text-slate-400 font-sans-medium mt-0.5'>{formatDate(date, "MMM dd '•' hh:mm a")}</Text>
      </View>
      <Text className={`text-base text-right font-sans-extrabold ${isIncome ? 'text-green-600' : 'text-error-600'}`}>
        {isIncome ? '+' : '-'} {amount} Ks
      </Text>
    </Pressable>
  );
}
