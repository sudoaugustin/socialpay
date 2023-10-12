import { yupResolver } from '@hookform/resolvers/yup';
import { useRevalidate } from 'hooks/useQuery';
import { ReactNode } from 'react';
import { DefaultValues, FieldValues, FormProvider, Path, SubmitHandler, UseFormReturn, UseFormSetValue, useForm } from 'react-hook-form';
import request, { RequestConfig, RespondError } from 'utils/request';
import { ObjectSchema } from 'yup';

type Props<TValues extends FieldValues, ExtraChildProps = unknown> = {
  url?: string;
  watch?: boolean;
  schema: ObjectSchema<TValues>;
  config?: RequestConfig<TValues>;
  initial?: DefaultValues<TValues>;
  reshape?: (values: TValues) => unknown;
  children: (arg: UseFormReturn<TValues> & { values: TValues; onSubmit: Function } & ExtraChildProps) => ReactNode;
  revalidates?: string[];
  onError?: (
    options: RespondError & {
      values: TValues;
      setValue: UseFormSetValue<TValues>;
      setError: (name: Path<TValues>, msg: string) => void;
    },
  ) => void;
  onSubmit?: SubmitHandler<TValues>;
  onSuccess?: (arg: { data?: any; values: TValues; setValue: UseFormSetValue<TValues> }) => void;
};

export default function Form<TValues extends FieldValues>({
  url,
  watch,
  schema,
  initial,
  reshape,
  children,
  config,
  revalidates = [],
  onError,
  onSubmit,
  onSuccess,
}: Props<TValues>) {
  const form = useForm<TValues>({ mode: 'onChange', resolver: yupResolver(schema), defaultValues: initial });
  const revalidate = useRevalidate();

  const handleSubmit: SubmitHandler<TValues> = (values) => {
    if (url) {
      return request(url, { ...config, payload: reshape ? reshape(values) : values })
        .then((data) => {
          revalidates.forEach(revalidate);
          onSuccess?.({ data, values, setValue: form.setValue });
        })
        .catch((error) => {
          onError?.({
            ...error,
            values,
            setValue: form.setValue,
            setError: (name, message) => form.setError(name, { type: 'validate', message }),
          });
        });
    }
  };

  return (
    <FormProvider {...form}>
      {children({ values: watch ? form.watch() : form.getValues(), ...form, onSubmit: form.handleSubmit(onSubmit || handleSubmit) })}
    </FormProvider>
  );
}

export type { Props as FormProps };
