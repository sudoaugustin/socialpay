import { useRouter } from 'expo-router';
import { Text, View, ViewProps } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = ViewProps & {
  title: string;
  invert?: boolean;
  onReturn?: Function;
};

export default function Return({ title, invert, children, onReturn, ...rest }: Props) {
  const router = useRouter();

  return (
    <View {...rest} className='flex-row items-center relative justify-between py-2.5 gap-x-0.5'>
      <Svg
        viewBox='0 0 24 24'
        onPress={() => (onReturn ? onReturn() : router.back())}
        className={`w-6 h-6 ${invert ? 'fill-slate-100' : 'fill-slate-600'}`}
      >
        <Path
          d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z'
          clipRule='evenodd'
          fillRule='evenodd'
        />
      </Svg>
      <Text className={`text-lg text-center -z-10 font-sans-bold absolute w-full ${invert ? 'text-white' : 'text-slate-800'}`}>
        {title}
      </Text>
      {children}
    </View>
  );
}
