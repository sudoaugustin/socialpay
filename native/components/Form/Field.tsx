import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode, useState } from 'react';
import { useController } from 'react-hook-form';
import { Text, View, ViewProps } from 'react-native';

type Fix = (args: { value: string; setValue: (v: string) => void }) => ReactNode;

type Props = Omit<ViewProps, 'children'> &
  VariantProps<typeof classes> & {
    name: string;
    bare?: boolean;
    label?: string;
    prefix?: Fix;
    postfix?: Fix;
    children: (prop: { value: string; isFocus: boolean; setValue: (v: string) => void; setFocus: (v: boolean) => void }) => ReactNode;
  };

type FieldProps = Omit<Props, 'children'> & VariantProps<typeof classes>;

const classes = cva('flex-row flex-grow overflow-hidden relative', {
  variants: {
    state: {
      idle: 'border-slate-200 dark:border-slate-800',
      error: 'border-error-400 dark:border-error-800',
      focus: 'border-brand-400 dark:border-brand-800',
      disable: 'border-slate-200',
    },
    variant: {
      solid: 'py-1.5 px-3 bg-slate-50 dark:bg-slate-900 border rounded-md',
      outline: 'py-0.5 bg-transparent border-b',
    },
  },
});

export default function Field({ bare, name, state, label, prefix, postfix, variant = 'solid', children, ...rest }: Props) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });
  const [isFocus, setFocus] = useState(false);

  const message = error?.message;
  const $children = children({ value, isFocus, setValue: onChange, setFocus });

  return (
    <View {...rest}>
      {label && (
        <Text className={`text-slate-600 dark:text-slate-400 font-sans-semibold ${variant === 'solid' ? 'mb-2' : 'mb-0.5'}`}>{label}</Text>
      )}
      {bare ? (
        $children
      ) : (
        <View className={classes({ state: state || (isFocus ? 'focus' : message ? 'error' : 'idle'), variant })}>
          {prefix?.({ value, setValue: onChange })}
          {$children}
          {postfix?.({ value, setValue: onChange })}
        </View>
      )}
      {message && <Text className='mt-1 font-sans-medium text-rose-600'>{message}</Text>}
    </View>
  );
}

export type { FieldProps };
