import { useStore } from '@nanostores/react';
import ProgressBar from 'icons/ProgressBar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $fetching } from 'stores/layout';

export default function Fetching() {
  const { top } = useSafeAreaInsets();
  const isFetching = useStore($fetching);

  return (
    isFetching && (
      <View style={{ top }} className='absolute w-full items-center z-40 py-1.5'>
        <ProgressBar size='lg' />
      </View>
    )
  );
}
