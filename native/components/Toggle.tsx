import { MotiView } from 'moti';
import { ReactNode } from 'react';
import { Text, View, ViewProps } from 'react-native';

type Props = ViewProps & {
  value: string;
  items: { label: ReactNode; value: string }[];
  onChange: (v: string) => void;
};

export default function Toggle({ items, value: $value, onChange, ...rest }: Props) {
  const widthPerItem = 100 / items.length;

  return (
    <View {...rest} className='border border-slate-300 rounded-md overflow-hidden'>
      <MotiView
        style={{ width: `${widthPerItem}%` }}
        animate={{ translateX: items.findIndex((item) => item.value === $value) * (widthPerItem + 5) }}
        className='absolute h-full bg-brand-50'
      />
      <View className='flex-row divide-x divide-slate-300'>
        {items.map(({ label, value }) => (
          <Text
            key={value}
            className={`px-3 py-1.5 text-xs font-sans-medium flex-1 text-center ${$value === value ? 'text-brand-600' : 'text-slate-600'}`}
            onPress={() => onChange(value)}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}
