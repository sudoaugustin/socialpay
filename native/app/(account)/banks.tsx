import Button from 'components/Button';
import Page from 'components/Page';
import ProgressBar from 'components/ProgressBar';
import TitleBar from 'components/TitleBar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import useIsDark from 'hooks/useIsDark';
import { useFetch } from 'hooks/useQuery';
import { AddCircleIcon, MinusCircleIcon } from 'icons/Math';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { $sheet } from 'stores/layout';
import { astrikeNumber } from 'utils';
import { banks } from 'utils/const';
import { AddBank, RmvBank, TransferBank } from 'views/Bank';

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
  const isDark = useIsDark();

  const { data, isLoading, mutate } = useFetch<Bank[]>('/bank');

  const showTransferPopup = (bank: Bank, isDeposit = true) => {
    $sheet.set({
      title: isDeposit ? t('deposit-into-bank') : t('withdraw-from-bank'),
      children: <TransferBank {...bank} isDeposit={isDeposit} />,
    });
  };

  return (
    <Page className='px-4'>
      <TitleBar title={t('bank-accounts')}>
        <AddCircleIcon
          onPress={() => $sheet.set({ title: t('connect-a-bank-account'), children: <AddBank mutate={mutate} /> })}
          className={`w-6 h-6 ${isDark ? 'fill-slate-400' : 'fill-slate-600'}`}
        />
      </TitleBar>
      {!data || isLoading ? (
        <View className='flex-1 flex-center'>
          {isLoading ? <ProgressBar size='lg' /> : <Text className='text-slate-600 font-sans-semibold'>{t('no-bank-account')}</Text>}
        </View>
      ) : (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='space-y-2.5 py-5'>
            {data.map((bank, index) => {
              const { _id, name, status, account } = bank;
              const { image, colors } = banks[name];
              return (
                <View key={index.toString()} className='h-48 w-full relative rounded-xl overflow-hidden'>
                  <LinearGradient colors={colors} className='w-full h-full' />
                  <MinusCircleIcon
                    className='w-4 h-4 fill-white absolute z-20 top-1.5 right-1.5'
                    onPress={() =>
                      $sheet.set({
                        title: t('remove-bank-acc'),
                        children: <RmvBank _id={_id} name={name} number={astrikeNumber(account.number)} mutate={mutate} />,
                      })
                    }
                  />
                  <View className='absolute z-10 inset-0 p-5 w-full h-full justify-between'>
                    <View className='flex-row items-end justify-between  w-full'>
                      <View className='w-8 h-8 flex-center bg-white rounded-md'>
                        <Image source={image} className='w-6 h-6' contentFit='contain' />
                      </View>
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
