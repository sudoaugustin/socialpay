import Input, { InputProps } from './Input';
import { Text, View } from 'react-native';

export default function Amount(props: InputProps) {
  return (
    <Input
      {...props}
      postfix={() => (
        <View className='flex-center translate-x-3 -my-1.5 px-4 bg-slate-100 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700/50'>
          <Text className='font-sans-medium text-slate-800 dark:text-slate-100'>Ks</Text>
        </View>
      )}
      keyboardType='number-pad'
    />
  );
}
