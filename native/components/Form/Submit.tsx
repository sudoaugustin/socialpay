import Button, { ButtonProps } from 'components/Button';
import { useFormState } from 'react-hook-form';
import { Text } from 'react-native';

type Props = ButtonProps & { onSubmit: Function };

export default function Submit({ onSubmit, ...rest }: Props) {
  const { isValid, isSubmitting } = useFormState();

  return <Button {...rest} state={isSubmitting ? 'loading' : isValid ? 'idle' : 'disable'} onPress={() => onSubmit()} />;
}
