import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ViewProps & { unsafe?: boolean };

export default function Page({ unsafe, children, ...rest }: Props) {
  const Root = unsafe ? View : SafeAreaView;
  return (
    <Root {...rest} className='min-h-full relative'>
      {children}
    </Root>
  );
}
