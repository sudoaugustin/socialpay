import { useStore } from '@nanostores/react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Page from 'components/Page';
import QRCode from 'components/QRCode/Display';
import { useRouter } from 'expo-router';
import { RecieveIcon, SendIcon } from 'icons/Payment';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $user } from 'stores';
import { $popup } from 'stores/layout';
import RecentTransactions from 'views/Home/RecentTransactions';
import Services from 'views/Home/Services';

export default function Index() {
  const { t } = useTranslation();
  const user = useStore($user);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Page unsafe className='bg-slate-50'>
      <View className='flex-center bg-brand-400 h-[65vw] px-4 gap-y-4 z-10 relative'>
        <View style={{ paddingTop: insets.top }} className='flex-row justify-end w-full gap-x-2 top-2.5 absolute'>
          <Avatar source={user?.avatar} size='xs' onPress={() => router.push('/setting')} />
        </View>
        <View className='justify-items-end gap-y-2.5 pt-8 w-full'>
          <Text className='text-white font-sans-bold text-4xl text-center'>{user?.balance} Ks</Text>
          <View className='flex-row gap-x-2 w-60 mx-auto'>
            <Button
              icon={<SendIcon className='w-5 h-5 fill-none stroke-brand-400' />}
              label={t('actions.send')}
              href='/send'
              intent='outline'
            />
            <Button
              icon={<RecieveIcon className='w-5 h-5 fill-none stroke-slate-200' />}
              label={t('actions.receive')}
              onPress={() => $popup.set({ title: t('scan-with-socialpay'), children: <QRCode /> })}
              className='bg-transparent'
            />
          </View>
        </View>
      </View>
      <Services />
      <ScrollView className='flex-1'>
        <RecentTransactions />
      </ScrollView>
    </Page>
  );
}
