import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Page from 'components/Page';
import QRCode from 'components/QRCode/Display';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import useProfile from 'hooks/useProfile';
import { Banks, Bills, RecieveIcon, SendIcon, Taxes, Topup } from 'icons/Transaction';
import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $sheet } from 'stores/layout';
import RecentTransactions from 'views/Home/RecentTransactions';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const { name, avatar, balance } = useProfile();

  const isDark = colorScheme === 'dark';

  const services = [
    {
      icon: <Banks className={`w-6 h-6 ${isDark ? 'stroke-slate-400' : 'stroke-slate-500'}`} />,
      label: t('services.banks'),
      href: 'banks',
    },
    {
      icon: <Topup className={`w-6 h-6 ${isDark ? 'stroke-slate-400' : 'stroke-slate-500'}`} />,
      label: t('services.topup'),
      href: 'topup',
    },
    {
      icon: <Bills className={`w-6 h-6 ${isDark ? 'stroke-slate-400' : 'stroke-slate-500'}`} />,
      label: t('services.bills'),
      href: '',
    },
    // { icon: <View />, label: 'Merchants', href: 'merchants' },
    {
      icon: <Taxes className={`w-6 h-6 ${isDark ? 'stroke-slate-400' : 'stroke-slate-500'}`} />,
      label: t('services.taxes'),
      href: '',
    },
  ] as const;

  return (
    <Page unsafe>
      <View className='flex-center h-[65vw] px-4 gap-y-4 z-10 relative'>
        <LinearGradient colors={isDark ? ['#0284c7', '#075985'] : ['#0EA5E9', '#3678DD']} className='w-screen h-full absolute' />
        <View style={{ paddingTop: insets.top }} className='flex-row justify-end w-full gap-x-2 top-2.5 absolute'>
          <Avatar name={name} source={avatar} size='xs' onPress={() => router.push('/setting')} />
        </View>
        <View className='justify-items-end gap-y-2.5 pt-8 w-full'>
          <Text className='text-white font-sans-bold text-4xl text-center'>{balance} Ks</Text>
          <View className='flex-row gap-x-2 w-60 mx-auto'>
            <Button
              icon={<SendIcon className={`w-5 h-5 ${isDark ? 'text-brand-600' : 'text-brand-500'}`} />}
              label={t('actions.send')}
              href='/send'
              intent='outline'
            />
            <Button
              icon={<RecieveIcon className={`w-5 h-5 ${isDark ? 'text-slate-800' : 'text-slate-200'}`} />}
              label={t('actions.receive')}
              onPress={() => $sheet.set({ title: t('scan-with-socialpay'), children: <QRCode /> })}
              className='bg-transparent'
            />
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='max-h-32 bg-transparent -mt-12 relative z-10'>
        <View className='flex-row space-x-2 px-4 py-5'>
          {services.map(({ icon, href, label }) => {
            const isCommingSoon = !href;
            return (
              <Pressable
                key={label}
                onPress={() => !isCommingSoon && router.push(href)}
                className='bg-slate-100 dark:bg-slate-800 px-4 w-40 items-start justify-center rounded-lg shadow-md shadow-slate-400 dark:shadow-slate-600 border border-slate-200 dark:border-slate-700'
              >
                {isCommingSoon && (
                  <Text className='absolute top-1.5 right-1.5 text-[10px] font-sans-bold px-2 py-0.5 bg-slate-500 text-slate-50 dark:text-slate-900 rounded-full'>
                    Coming Soon
                  </Text>
                )}
                <View className={`w-8 h-8 flex-center rounded-md bg-slate-200 dark:bg-slate-700 ${isCommingSoon && 'opacity-50'}`}>
                  {icon}
                </View>
                <Text
                  className={`mt-1 text-sm font-sans-semibold ${isCommingSoon ? 'text-slate-400' : 'text-slate-600 dark:text-slate-200'}`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <ScrollView className='flex-1'>
        <RecentTransactions />
      </ScrollView>
    </Page>
  );
}
