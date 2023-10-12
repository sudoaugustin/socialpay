import { usePathname, useRouter } from 'expo-router';
import { HomeIcon, SettingIcon, StoreIcon } from 'icons/Navbar';
import { Pressable, Text, View } from 'react-native';

const items = [
  {
    icon: (isActive: boolean) => <HomeIcon className={`w-5 h-5 ${isActive ? 'fill-brand-400' : 'fill-none stroke-slate-400'}`} />,
    label: 'Home',
    route: '/home',
  },
  {
    icon: (isActive: boolean) => <SettingIcon className={`w-5 h-5 ${isActive ? 'fill-brand-400' : 'fill-none stroke-slate-400'}`} />,
    label: 'Setting',
    route: '/setting',
  },
] as const;

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className='flex-row items-center absolute bottom-0 bg-white border-t border-slate-100 w-full h-14 z-10'>
      {items.map(({ icon, label, route }) => {
        const isActive = route === pathname;
        return (
          <Pressable key={label} className='flex-1 flex-center' onPress={() => router.push(route)}>
            {icon(isActive)}
            <Text className={`text-xs font-sans-medium ${isActive ? 'text-brand-500' : 'text-slate-500'}`}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
