import { Text, View, ViewProps } from 'react-native';

type Props = ViewProps & { label: string };

export default function Divider({ label, ...rest }: Props) {
  return (
    <View {...rest} className='flex-row items-center py-2.5'>
      <View className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-800' />
      <Text className='px-2 text-slate-400 dark:text-slate-600 font-sans'>{label}</Text>
      <View className='flex-1 h-[1px] bg-slate-300 dark:bg-slate-800' />
    </View>
  );
}
