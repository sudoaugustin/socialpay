import Button from 'components/Button';
import Page from 'components/Page';
import Return from 'components/Return';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFetch } from 'hooks/useQuery';
import { AddCircleIcon, CloseIcon } from 'icons';
import ProgressBar from 'icons/ProgressBar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { $popup } from 'stores/layout';
import { astrikeNumber } from 'utils';
import { banks } from 'utils/const';
import { AddBank, RmvBank, TransferBank } from 'views/BankPopups';

const classes = {
  root: {
    pending: 'bg-slate-50',
    verified: 'bg-green-50',
    rejected: 'bg-error-50',
  },
  text: {
    pending: 'text-slate-600',
    verified: 'text-green-600',
    rejected: 'text-error-600',
  },
};

export default function Banks() {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const { data, isLoading, mutate } = useFetch<Bank[]>('/bank');

  const showTransferPopup = (bank: Bank, isDeposit = true) => {
    $popup.set({
      title: isDeposit ? t('deposit-into-bank') : t('withdraw-from-bank'),
      children: <TransferBank {...bank} isDeposit={isDeposit} />,
    });
  };

  return (
    <Page className='px-4'>
      <Return title={t('bank-accounts')} className={`${offset > 16 && 'border-b border-slate-300'}`}>
        <AddCircleIcon
          onPress={() => $popup.set({ title: t('connect-a-bank-account'), children: <AddBank mutate={mutate} /> })}
          className='w-6 h-6 fill-slate-600'
        />
      </Return>
      {!data || isLoading ? (
        <View className='flex-1 flex-center'>
          {isLoading ? <ProgressBar size='lg' /> : <Text className='text-slate-600 font-sans-semibold'>{t('no-bank-account')}</Text>}
        </View>
      ) : (
        <ScrollView
          className='flex-1'
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => setOffset(nativeEvent.contentOffset.y)}
        >
          <View className='space-y-2.5 py-5'>
            {data.map((bank, index) => {
              const { _id, name, status, account } = bank;
              const { image, colors } = banks[name];
              return (
                <View key={index.toString()} className='h-48 w-full relative rounded-xl overflow-hidden'>
                  <LinearGradient colors={colors} className='w-full h-full' />
                  <CloseIcon
                    className='w-3.5 h-3.5 stroke-[3px] stroke-white absolute z-20 top-2 right-2'
                    onPress={() =>
                      $popup.set({
                        title: t('remove-bank-acc'),
                        children: <RmvBank _id={_id} name={name} number={astrikeNumber(account.number)} mutate={mutate} />,
                      })
                    }
                  />
                  <View className='absolute z-10 inset-0 p-5 w-full h-full justify-between'>
                    <View className='flex-row items-end justify-between  w-full'>
                      <Image source={image} className='w-8 h-8 bg-white rounded-md' />
                      <Text className='uppercase font-sans-extrabold text-base text-white'>{name} Bank</Text>
                    </View>
                    <View className='space-y-2.5'>
                      <View className='flex-row items-end justify-between  w-full'>
                        <View>
                          <Text className='font-sans-bold text-white'>{account.holder}</Text>
                          <Text className='font-sans-semibold text-white/80 mt-1.5'>{astrikeNumber(account.number)}</Text>
                        </View>
                        <View className={`px-1.5 py-0.5 rounded ${classes.root[status]}`}>
                          <Text className={`text-xs font-sans-bold uppercase ${classes.text[status]}`}>
                            {t(`status.${status}` as never)}
                          </Text>
                        </View>
                      </View>
                      {status === 'verified' && (
                        <View className='flex-row gap-x-2.5'>
                          <Button className='flex-1 h-8 bg-white/50' label={t('actions.deposit')} onPress={() => showTransferPopup(bank)} />
                          <Button
                            className='flex-1 h-8 bg-white/50'
                            label={t('actions.withdraw')}
                            onPress={() => showTransferPopup(bank, false)}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </Page>
  );
}
