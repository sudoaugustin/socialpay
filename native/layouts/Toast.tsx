import { useStore } from '@nanostores/react';
import Motion from 'components/Motion';
import { ErrorIcon, SuccessIcon } from 'icons/Status';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $toast } from 'stores/layout';

const icons = {
  error: <ErrorIcon className='w-5 h-5 fill-error-500' />,
  normal: undefined,
  success: <SuccessIcon className='w-5 h-5 fill-green-500' />,
};

export default function Toast() {
  const toast = useStore($toast);
  const insets = useSafeAreaInsets();
  const { type = 'success', message } = toast || {};

  return (
    message && (
      <Motion
        y={-20}
        style={{ marginTop: insets.top }}
        className='absolute inset-x-4 flex-row items-center z-50 top-4 space-x-2 px-5 py-2.5 rounded-md shadow-xl bg-slate-100 dark:bg-slate-900'
      >
        {icons[type]}
        <Text className='text-slate-900 dark:text-slate-100 font-sans-bold'>{message}</Text>
      </Motion>
    )
  );
}
