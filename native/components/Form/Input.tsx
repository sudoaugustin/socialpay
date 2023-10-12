import Field, { FieldProps } from './Field';
import { TextInput, TextInputProps } from 'react-native';

type Props = FieldProps & TextInputProps;

export default function Input({ style, bare, label, name, prefix, postfix, variant, ...rest }: Props) {
  const fieldProps = { bare, label, name, style, prefix, postfix, variant };

  return (
    <Field {...fieldProps}>
      {({ value, setValue, setFocus }) => (
        <TextInput
          {...rest}
          value={value}
          style={{ textAlignVertical: rest.multiline ? 'top' : 'center' }}
          editable={rest.state !== 'disable'}
          className='h-full flex-1 font-sans-medium'
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onChangeText={setValue}
        />
      )}
    </Field>
  );
}

export type { Props as InputProps };
