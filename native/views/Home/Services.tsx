import { useRouter } from 'expo-router';
import { Banks, Bills, Taxes, Topup } from 'icons/Services';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function Services() {
  const router = useRouter();
  const { t } = useTranslation();

  const items = [
    { icon: <Banks className='w-6 h-6 fill-none stroke-slate-600' />, label: t('services.banks'), href: 'banks' },
    { icon: <Topup className='w-6 h-6 fill-none stroke-slate-600' />, label: t('services.topup'), href: 'topup' },
    { icon: <Bills className='w-6 h-6 fill-none stroke-slate-600' />, label: t('services.bills'), href: '' },
    // { icon: <View />, label: 'Merchants', href: 'merchants' },
    { icon: <Taxes className='w-6 h-6 fill-none stroke-slate-600' />, label: t('services.taxes'), href: '' },
  ] as const;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='max-h-32 bg-transparent -mt-12 relative z-40'>
      <View className='flex-row space-x-2 px-4 py-5'>
        {items.map(({ icon, href, label }) => {
          const isCommingSoon = !href;
          return (
            <Pressable
              key={label}
              onPress={() => !isCommingSoon && router.push(href)}
              className='bg-white px-4 w-36 items-start justify-center rounded-lg shadow-md shadow-slate-400 border border-slate-200'
            >
              {isCommingSoon && (
                <Text className='absolute top-1.5 right-1.5 text-[10px] font-sans-bold px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full'>
                  Coming Soon
                </Text>
              )}
              <View className={`w-8 h-8 flex-center rounded-md bg-slate-100 ${isCommingSoon && 'opacity-50'}`}>{icon}</View>
              <Text className={`mt-1 text-sm font-sans-semibold ${isCommingSoon ? 'text-slate-400 ' : 'text-slate-500 '}`}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
