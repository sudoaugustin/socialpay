import { useStore } from '@nanostores/react';
import Page from 'components/Page';
import RadioList from 'components/RadioList';
import TitleBar from 'components/TitleBar';
import { useRouter } from 'expo-router';
import useIsDark from 'hooks/useIsDark';
import { ChevronIcon } from 'icons/Chevron';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { $sheet, $theme } from 'stores/layout';
import { themes } from 'utils/const';
import ChooseLang from 'views/ChooseLang';

export default function Send() {
  const { t } = useTranslation();
  const theme = useStore($theme);
  const router = useRouter();
  const isDark = useIsDark();

  const items = [
    { label: t('profile'), href: '/setting/profile' },
    { label: t('sessions'), href: '/setting/sessions' },
    {
      label: t('theme'),
      onPress: () =>
        $sheet.set({
          title: t('choose-theme'),
          children: (
            <RadioList
              value={theme as string}
              options={themes}
              className='mt-5'
              onSelect={(theme) => {
                $theme.set(theme as never);
                $sheet.set(undefined);
              }}
            />
          ),
        }),
    },
    {
      label: t('lang'),
      onPress: () =>
        $sheet.set({
          title: t('choose-language'),
          children: <ChooseLang />,
        }),
    },
    // { label: t('faq'), href: '/setting/support' },
    { label: t('logout'), href: '/setting/logout' },
  ];

  return (
    <Page className='px-4'>
      <TitleBar title={t('settings')} />
      <View className='-mx-4'>
        {items.map(({ href, label, onPress }) => (
          <Pressable
            key={label}
            className='px-4 flex-row items-center justify-between h-16 border-b border-slate-100 dark:border-slate-900'
            onPress={() => (onPress ? onPress() : router.push(href as string))}
          >
            <Text className='text-base text-slate-800 dark:text-slate-200 font-sans-semibold'>{label}</Text>
            <ChevronIcon className={`rotate-90 w-5 h-5 ${isDark ? 'fill-slate-400' : 'fill-slate-600'}`} />
          </Pressable>
        ))}
      </View>
    </Page>
  );
}
