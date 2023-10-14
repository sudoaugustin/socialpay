import { useStore } from '@nanostores/react';
import Motion from 'components/Motion';
import { CloseCircleIcon } from 'icons/Close';
import { Pressable, Text, View } from 'react-native';
import { $sheet } from 'stores/layout';

export default function Sheet() {
  const sheet = useStore($sheet);

  return (
    sheet && (
      <View className='absolute w-full h-full justify-end z-40'>
        <Pressable className='absolute inset-0 w-full h-full bg-slate-500/50' onPress={() => $sheet.set(undefined)} />
        <Motion y={100} className={`bg-white dark:bg-slate-900 py-10 px-5 rounded-t-3xl ${sheet.className}`}>
          {sheet.title && <Text className='text-xl text-slate-950 dark:text-white font-sans-extrabold'>{sheet.title}</Text>}
          {sheet.children}
          <View className='absolute top-2.5 right-2.5'>
            <CloseCircleIcon className='w-6 h-6 text-slate-500' onPress={() => $sheet.set(undefined)} />
          </View>
        </Motion>
      </View>
    )
  );
}
