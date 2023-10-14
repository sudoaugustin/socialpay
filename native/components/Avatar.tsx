import { Image as ExpoImage, ImageProps } from 'expo-image';
import { UserIcon } from 'icons';
import { Pressable, PressableProps, Text } from 'react-native';

type Size = 'xs' | 'sm' | 'md' | 'lg';

type Props = PressableProps & { size?: Size; name?: string; source: ImageProps['source'] };

export default function Avatar({ name = '', size = 'md', source, className, ...rest }: Props) {
  const classes = {
    root: {
      xs: 'w-8 h-8',
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-20 h-20',
    },
    text: {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
    icon: {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-10 h-10',
    },
  };

  return (
    <Pressable
      {...rest}
      className={`rounded-full flex-center overflow-hidden bg-brand-50 dark:bg-brand-950 border border-brand-100/25 dark:border-brand-900/25 ${classes.root[size]} ${className}`}
    >
      {source ? (
        <ExpoImage source={source} className='w-full h-full' />
      ) : name ? (
        <Text className={`font-sans-extrabold text-brand-500 ${classes.text[size]}`}>{name[0]}</Text>
      ) : (
        <UserIcon className={`fill-brand-400 ${classes.icon[size]}`} />
      )}
    </Pressable>
  );
}
