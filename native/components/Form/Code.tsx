import Field, { FieldProps } from './Field';
import { Text, TextInput, View } from 'react-native';

type Props = Omit<FieldProps, 'label'>;

export default function Code(props: Props) {
  return (
    <Field bare {...props}>
      {({ value = '', isFocus, setValue, setFocus }) => (
        <View>
          <View className='flex-row justify-between gap-x-2'>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                className={`w-12 h-12 bg-slate-50 border rounded-md flex-center 
                ${isFocus && index === value.length ? 'border-brand-400' : 'border-slate-200'}`}
              >
                <Text className='text-4xl font-sans-medium mt-1.5'>{value[index]}</Text>
              </View>
            ))}
          </View>
          <TextInput
            value={value}
            autoFocus
            maxLength={6}
            className='absolute w-full h-full opacity-0'
            caretHidden
            keyboardType='numeric'
            onChangeText={setValue}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          />
        </View>
      )}
    </Field>
  );
}
