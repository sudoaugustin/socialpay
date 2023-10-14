import { VariantProps, cva } from 'class-variance-authority';
import { MotiView } from 'moti';
import { View, ViewProps } from 'react-native';

type Props = ViewProps & VariantProps<typeof classes> & { invert?: boolean };

type Size = 'md' | 'lg';

const classes = cva('relative overflow-hidden rounded-full', {
  variants: {
    size: {
      md: 'w-10 h-1',
      lg: 'w-20 h-1.5',
    },
  },
});

export default function ProgressBar({ size = 'md', invert, ...rest }: Props) {
  const x = {
    md: 30,
    lg: 60,
  };

  const width = {
    md: 'w-2.5',
    lg: 'w-5',
  };

  return (
    <View {...rest} className={classes({ size })}>
      <View className={`w-full h-full ${invert ? 'bg-white/25' : 'bg-brand-400/25'}`} />
      <MotiView
        animate={{ translateX: [0, x[size as Size]] }}
        transition={{ loop: true, type: 'timing', delay: 0, duration: 500 }}
        className={`absolute h-full rounded-full ${width[size as Size]} ${invert ? 'bg-white' : 'bg-brand-400'}`}
      />
    </View>
  );
}
