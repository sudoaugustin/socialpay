import { useStore } from '@nanostores/react';
import Page from 'components/Page';
import Return from 'components/Return';
import { useRouter } from 'expo-router';
import { ChevronIcon } from 'icons/Chevron';
import { Pressable, Switch, Text, View } from 'react-native';
import { $isDark } from 'stores';
import LangsToggle from 'views/LangsToggle';

export default function Send() {
  const router = useRouter();
  const isDark = useStore($isDark);

  const items = [
    { label: 'Profile', href: '/setting/profile' },
    { label: 'Sessions', href: '/setting/sessions' },
    {
      label: 'Dark Mode',
      item: (
        <Switch
          value={isDark}
          trackColor={{ false: '#e2e8f0', true: '#bae6fd' }}
          thumbColor={isDark ? '#38bdf8' : '#94a3b8'}
          onValueChange={$isDark.set}
        />
      ),
    },
    { label: 'Language', item: <LangsToggle /> },
    { label: 'FAQ & Support', href: '/setting/support' },
    { label: 'Logout', href: '/setting/logout' },
  ];

  return (
    <Page className='px-4'>
      <Return title='Settings' />
      <View className='divide-y divide-slate-100'>
        {items.map(({ item, href, label }) => (
          <Pressable key={label} className='flex-row items-center justify-between h-16' onPress={() => href && router.push(href)}>
            <Text className='text-base text-slate-900 font-sans-semibold'>{label}</Text>
            {href ? <ChevronIcon className='fill-slate-600 rotate-90 w-5 h-5' /> : item}
          </Pressable>
        ))}
      </View>
    </Page>
  );
}
