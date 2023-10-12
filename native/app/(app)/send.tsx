import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Divider from 'components/Divider';
import { Input, MultiForm, Submit } from 'components/Form';
import Amount from 'components/Form/Amount';
import ContactInput from 'components/Form/ContactInput';
import Page from 'components/Page';
import Scanner from 'components/QRCode/Scanner';
import Return from 'components/Return';
import { useFetch } from 'hooks/useQuery';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { $toast } from 'stores/layout';
import { formatDate, formatMobile } from 'utils';
import schemas from 'utils/schemas';

const $schemas = [
  schemas.object({ mobile: schemas.mobile }),
  schemas.object({ note: schemas.string(), amount: schemas.amount }),
  schemas.object({}),
] as const;

export default function Send() {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const [data, setData] = useState({ id: '', date: '', name: '', avatar: '' });
  const { data: recents = [] } = useFetch<User[]>('/user/recent');

  const handleError = (message: string) => $toast.set({ type: 'error', message });

  const handleSuccess = ({ data }: any) => setData((oldData) => ({ ...oldData, ...data }));

  return (
    <Page unsafe className='px-4'>
      <MultiForm
        forms={[
          {
            url: '/user/exist',
            schema: $schemas[0],
            config: { method: 'GET' },
            children: ({ setStep, setStore, setValue, onSubmit }) => (
              <View className='min-h-full relative'>
                <Return title={t('scan-to-pay')} invert style={{ top: top + 10 }} className='absolute z-20 w-full' />
                <Scanner
                  onScanned={(data) => {
                    const { mobile } = JSON.parse(data);
                    setValue('mobile', mobile);
                    onSubmit();
                  }}
                />
                <ScrollView className='flex-1 pb-2.5' showsVerticalScrollIndicator={false}>
                  <ScrollView horizontal className='py-5' showsHorizontalScrollIndicator={false}>
                    <View className='flex-row gap-x-4'>
                      {recents.map(({ name, mobile, avatar }) => (
                        <Pressable
                          key={mobile}
                          className='items-center flex-1 max-w-[5rem]'
                          onPress={() => {
                            setStep(2);
                            setStore({ name, mobile, avatar });
                          }}
                        >
                          <Avatar size='md' name={name} source={avatar} />
                          <Text className='mt-1 font-sans-medium text-xs text-center' numberOfLines={1}>
                            {name}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                  <Divider label={`${t('or')} ${t('enter-manual')}`} />
                  <View className='py-5 space-y-5'>
                    <ContactInput />
                    <Submit label={t('actions.continue')} onSubmit={onSubmit} />
                  </View>
                </ScrollView>
              </View>
            ),
            onError: ({ status, message, setError }) => {
              status === 404 ? setError('mobile', t("errors.can't-find-account")) : handleError(message);
            },
            onSuccess: handleSuccess,
          },
          {
            url: '/transaction',
            schema: $schemas[1],
            children: ({ values, setStep, onSubmit }) => (
              <SafeAreaView className='pb-2.5 space-y-5'>
                <Return title={t('actions.transfer')} onReturn={() => setStep(1)} />
                <View className='items-center py-2.5'>
                  <Avatar size='lg' name={data.name} source={data.avatar} />
                  <Text className='text-lg font-sans-bold mt-2'>{data.name}</Text>
                  <Text className='text-sm font-sans-medium'>{formatMobile(values.mobile)}</Text>
                </View>
                <Amount name='amount' label={t('amount')} />
                <Input name='note' label={`${t('note')} (${t('optional')})`} multiline numberOfLines={5} />
                <Submit label={t('actions.send')} onSubmit={onSubmit} />
              </SafeAreaView>
            ),
            revalidates: ['/user'],
            onError: ({ status, message, setError }) => {
              status === 403 ? setError('amount', t('errors.insufficient-balance')) : handleError(message);
            },
            onSuccess: handleSuccess,
          },
          {
            url: '',
            schema: $schemas[2],
            children: ({ values }) => {
              return (
                <SafeAreaView className='w-full pt-5 pb-10 space-y-5'>
                  <View className='w-full'>
                    <LottieView
                      loop={false}
                      autoPlay
                      source={require('../../assets/lotties/payment-success.json')}
                      //@ts-ignore
                      className='w-32 h-32 mx-auto'
                    />
                    <Text className='font-sans-bold text-lg my-5 mx-auto'>{t('transaction-success')}</Text>
                    <View className='bg-slate-50 w-full rounded-xl border border-slate-200'>
                      <View className='flex-row items-center justify-between px-2.5 py-5 border-b border-dashed border-slate-200'>
                        <View className='flex-row items-center gap-x-2.5'>
                          <Avatar name={data.name} source={data.avatar} />
                          <View>
                            <Text className='font-sans-extrabold text-sm'>{data.name || t('unknown')}</Text>
                            <Text className='font-sans-medium text-xs text-slate-600'>{formatMobile(values.mobile)}</Text>
                          </View>
                        </View>
                        <Text className='font-sans-bold text-base text-error-500'>- {values.amount} Ks</Text>
                      </View>
                      <View className='px-2.5 py-5 space-y-5'>
                        <View className='space-y-0.5'>
                          <Text className='font-sans-medium text-sm text-slate-500'>{t('transaction-id')}</Text>
                          <Text className='font-sans-medium text-sm text-slate-800'>{data.id}</Text>
                        </View>
                        <View className='space-y-0.5'>
                          <Text className='font-sans-medium text-sm text-slate-500'>{t('transaction-id')}</Text>
                          <Text className='font-sans-medium text-sm text-slate-800'>{formatDate(data.date)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Button href='/home' label={t('actions.gohome')} className='w-full' />
                </SafeAreaView>
              );
            },
          },
        ]}
      />
    </Page>
  );
}
