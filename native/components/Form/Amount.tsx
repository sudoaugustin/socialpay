import Input, { InputProps } from './Input';
import { Text, View } from 'react-native';

export default function Amount(props: InputProps) {
  return (
    <Input
      {...props}
      postfix={() => (
        <View className='flex-center translate-x-3 -my-1.5 px-4 bg-slate-100 border-l border-slate-200'>
          <Text className='font-sans-medium'>Ks</Text>
        </View>
      )}
      keyboardType='number-pad'
    />
  );
}
