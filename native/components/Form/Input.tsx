import Field, { FieldProps } from './Field';
import { useStore } from '@nanostores/react';
import useIsDark from 'hooks/useIsDark';
import { TextInput, TextInputProps } from 'react-native';

type Props = FieldProps & TextInputProps;

export default function Input({ style, bare, label, name, prefix, postfix, variant, ...rest }: Props) {
  const isDark = useIsDark();
  const fieldProps = { bare, label, name, style, prefix, postfix, variant };

  return (
    <Field {...fieldProps}>
      {({ value, setValue, setFocus }) => (
        <TextInput
          {...rest}
          value={value}
          style={{ textAlignVertical: rest.multiline ? 'top' : 'center' }}
          editable={rest.state !== 'disable'}
          className='h-full flex-1 font-sans-medium text-slate-950 dark:text-slate-50'
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onChangeText={setValue}
          placeholderTextColor={isDark ? '#94a3b8' : '#475569'}
        />
      )}
    </Field>
  );
}

export type { Props as InputProps };
