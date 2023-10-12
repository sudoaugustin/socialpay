import { useStore } from '@nanostores/react';
import Motion from 'components/Motion';
import { CloseCircleIcon } from 'icons';
import { Pressable, Text, View } from 'react-native';
import { $popup } from 'stores/layout';

export default function Popup() {
  const popup = useStore($popup);

  return (
    popup && (
      <View className='absolute w-full h-full justify-end z-20'>
        <Pressable className='absolute inset-0 w-full h-full bg-slate-800/50' onPress={() => $popup.set(undefined)} />
        <Motion y={100} className={`m-2.5 bg-white py-10 px-5 rounded-3xl ${popup.className}`}>
          {popup.title && <Text className='text-xl font-sans-extrabold'>{popup.title}</Text>}
          {popup.children}
          <View className='absolute top-2.5 right-2.5'>
            <CloseCircleIcon className='w-6 h-6 fill-slate-600' onPress={() => $popup.set(undefined)} />
          </View>
        </Motion>
      </View>
    )
  );
}
