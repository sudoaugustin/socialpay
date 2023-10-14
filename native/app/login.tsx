import Button from 'components/Button';
import { Code, MultiForm, Phone, Submit } from 'components/Form';
import Page from 'components/Page';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { $token } from 'stores';
import { $toast } from 'stores/layout';
import { astrikeNumber } from 'utils';
import schemas from 'utils/schemas';

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Page unsafe className='relative'>
      <View className='flex-row justify-between absolute w-screen h-full px-2.5'>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} className='h-full border-l border-slate-200/75 border-dashed' />
        ))}
      </View>
      <View className='h-80 bg-brand-400 -skew-y-12 -m-12 mb-0 relative z-10' />
      <ScrollView className='flex-1 -mt-10 space-y-40 pt-28 pb-2.5'>
        <MultiForm
          forms={[
            {
              url: 'auth/login',
              schema: schemas.object({ mobile: schemas.mobile }),
              children: ({ onSubmit }) => (
                <View className='space-y-4 w-screen px-4'>
                  <Text className='text-2xl font-sans-extrabold text-slate-800 mb-8'>{t('welcome')}</Text>
                  <Phone name='mobile' label={t('mobile')} />
                  <Submit label={t('actions.continue')} onSubmit={onSubmit} />
                </View>
              ),
              onError: ({ message }) => $toast.set({ type: 'error', message }),
            },
            {
              url: 'auth/verify',
              schema: schemas.object({ code: schemas.code.required('Please enter OTP code') }),
              children: ({ values, setStep, onSubmit }) => (
                <View className='w-screen px-4 space-y-4'>
                  <Text className='text-2xl font-sans-extrabold text-slate-800 mb-8'>
                    {t('enter-code').replace('$phone', `09${astrikeNumber(values.mobile)}`)}
                  </Text>
                  <Code name='code' />
                  <Submit label={t('actions.verify')} onSubmit={onSubmit} />
                  <Button label={t('actions.goback')} intent='outline' onPress={() => setStep(1)} />
                </View>
              ),
              onError: ({ status, message, setError }) => {
                if (status === 406) return setError('code', 'Please enter valid code');
                $toast.set({ type: 'error', message });
              },
              onSuccess: ({ data }) => {
                const { token } = data as { token: string };
                $token.set(token);
                router.replace('/home');
              },
            },
          ]}
        />
      </ScrollView>
    </Page>
  );
}
