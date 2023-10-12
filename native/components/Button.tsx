import { VariantProps, cva } from 'class-variance-authority';
import { useRouter } from 'expo-router';
import ProgressBar from 'icons/ProgressBar';
import { ReactNode, useState } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

type Props = Omit<Classes, 'pseudo'> &
  PressableProps & {
    href?: string;
    label: ReactNode;
    icon?: ReactNode;
  };

type Classes = VariantProps<typeof root>;

const root = cva('flex-center flex-row rounded-lg px-4 h-10', {
  variants: {
    state: { idle: '', loading: '', disable: 'opacity-50' },
    intent: { solid: 'bg-brand-600', outline: 'bg-brand-100' },
    pseudo: { active: '' },
  },
  compoundVariants: [
    { pseudo: 'active', intent: 'solid', className: 'bg-brand-500' },
    { pseudo: 'active', intent: 'outline', className: 'bg-brand-200' },
  ],
});

const text = cva('text-sm font-sans-bold', {
  variants: {
    intent: { solid: 'text-white', outline: 'text-brand-600' },
  },
});

export default function Button({ href, icon, state = 'idle', label, intent = 'solid', className, onPress, ...rest }: Props) {
  const router = useRouter();
  const [pseudo, setPseudo] = useState<Classes['pseudo']>();

  const handlePress = () => {
    href && router.push(href);
  };

  return (
    <Pressable
      {...rest}
      disabled={state !== 'idle'}
      className={root({ state, intent, pseudo, className })}
      onPress={onPress || handlePress}
      onPressIn={() => setPseudo('active')}
      onPressOut={() => setPseudo(undefined)}
    >
      {state === 'loading' ? (
        <ProgressBar invert />
      ) : (
        <View className='flex-row items-center gap-x-1'>
          {icon}
          <Text className={text({ intent })}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

export type { Props as ButtonProps };
