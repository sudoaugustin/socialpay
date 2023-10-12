import { useStore } from '@nanostores/react';
import { cva } from 'class-variance-authority';
import Motion from 'components/Motion';
import { ErrorIcon, SuccessIcon } from 'icons/Status';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $toast } from 'stores/layout';

const icons = {
  error: <ErrorIcon className='w-5 h-5 fill-error-400' />,
  normal: undefined,
  success: <SuccessIcon className='w-5 h-5 fill-green-400' />,
};

const classes = cva('absolute inset-x-4 flex-row items-center z-30 top-4 space-x-2 px-5 py-2.5 rounded-md bg-white shadow-xl', {
  variants: {
    state: {
      error: 'bg-rose-50',
      normal: 'bg-slate-50',
      success: 'bg-emerald-50',
    },
  },
});

export default function Toast() {
  const toast = useStore($toast);
  const insets = useSafeAreaInsets();
  const { type = 'success', message } = toast || {};

  return (
    message && (
      <Motion y={-20} style={{ marginTop: insets.top }} className={classes({ state: type })}>
        {icons[type]}
        <Text className='text-slate-900 font-sans-bold'>{message}</Text>
      </Motion>
    )
  );
}
