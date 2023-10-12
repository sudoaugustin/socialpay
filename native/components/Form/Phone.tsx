import Input, { InputProps } from './Input';
import { Text, View } from 'react-native';

type Props = InputProps & {};

export default function Phone({ ...rest }: Props) {
  return (
    <Input
      {...rest}
      prefix={() => (
        <View
          className={`flex-center 
          ${rest.variant === 'outline' ? 'pr-2' : 'px-4 -my-1.5 -translate-x-3  bg-slate-100 border-r border-slate-200'}`}
        >
          <Text className='font-sans-medium'>09</Text>
        </View>
      )}
      autoComplete='tel'
      keyboardType='phone-pad'
    />
  );
}
