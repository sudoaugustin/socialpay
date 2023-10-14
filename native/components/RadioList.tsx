import { Pressable, Text, View, ViewProps } from 'react-native';
import { cookOptions } from 'utils';

type Props<T = string> = ViewProps & {
  value: T;
  options: Option[];
  onSelect: (v: string) => void;
};

export default function RadioList({ value: $value, options, onSelect, ...rest }: Props) {
  const $options = cookOptions(options);
  return (
    <View {...rest}>
      {$options.map(({ label, value }) => {
        const isActive = value === $value;
        return (
          <Pressable key={value} className='py-2.5 space-x-1.5 flex-row items-center' onPress={() => onSelect(value)}>
            <View
              className={`w-3.5 h-3.5 flex-center rounded-full ${isActive ? 'border-4 border-brand-600' : 'border-2 border-slate-600'}`}
            />
            <Text className='text-base text-slate-800 dark:text-slate-200 font-sans-semibold capitalize'>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
