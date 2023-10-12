import { Text, View } from 'react-native';

type Props = {
  children: { month: string; income: number; outcome: number }[];
};

export default function NetChart({ children }: Props) {
  const colors = [
    { value: 'bg-teal-400', label: 'Income' },
    { value: 'bg-rose-400', label: 'Outcome' },
  ];
  return (
    <View className='rounded-md'>
      <View>
        <Text className='font-sans-semibold text-sm text-slate-600'>Transaction Report</Text>
      </View>
      <View className='flex-row justify-between mt-4 mb-2'>
        {children.map(({ month, income, outcome }) => {
          const isLost = income > outcome;
          return (
            <View key={month} className='items-center h-60'>
              <View className='w-5 flex-1 overflow-hidden'>
                {colors.map(({ value }, i) => (
                  <View key={value} className={`w-full rounded-t-md absolute bottom-0 ${value} ${i === 0 ? 'h-full' : 'h-1/2 z-10'}`} />
                ))}
              </View>
              <Text className='text-xs font-sans-bold mt-2 text-slate-400'>{month}</Text>
            </View>
          );
        })}
      </View>
      <View className='flex-row items-center justify-center gap-x-4'>
        {colors.map(({ label, value }) => (
          <View key={label} className='flex-row items-center gap-x-1'>
            <View className={`w-2 h-2 rounded-full ${value}`} />
            <Text className='font-sans-semibold text-xs text-slate-500'>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
