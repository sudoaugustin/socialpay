import Button, { ButtonProps } from './button';
import { useFetch, useMutate } from 'hooks/request';
import { RequestConfig } from 'utils/request';

export default function MutateButton({
  url,
  config,
  onSuccess,
  ...rest
}: ButtonProps & { url: string; config: RequestConfig<any>; onSuccess?: Function }) {
  const { isMutating, mutate } = useMutate(url);
  return <Button {...rest} state={isMutating ? 'loading' : undefined} onClick={() => mutate(config).then(() => onSuccess?.())} />;
}
