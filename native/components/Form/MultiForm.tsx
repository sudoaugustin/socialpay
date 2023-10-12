import Form, { FormProps } from './Form';
import { View } from 'moti';
import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react';
import { Dimensions } from 'react-native';

type Props = {
  forms: FormProps<any, { setStep: SetStep; setStore: Dispatch<any> }>[];
  children?: (arg: { step: number; values: any; setStep: SetStep }) => ReactNode;
};

type SetStep = Dispatch<SetStateAction<number>>;

type ErrorHandler = (v: Props['forms'][number]['onError']) => NonNullable<FormProps<any>['onError']>;

type SuccessHandler = (v: Props['forms'][number]['onSuccess']) => NonNullable<FormProps<any>['onSuccess']>;

const screenWidth = Dimensions.get('window').width;

export default function Multi({ forms, children }: Props) {
  const [step, setStep] = useState<number>(1);
  const [store, setStore] = useState<any>({});

  const handleError: ErrorHandler = (onError) => ({ values, ...rest }) => {
    onError?.({ values: { ...store, ...values }, ...rest });
  };

  const handleSuccess: SuccessHandler = (onSuccess) => ({ values, ...rest }) => {
    const newStore = { ...store, ...values };
    setStore(newStore);
    onSuccess?.({ values: newStore, ...rest });
    setStep((n) => (forms.length === n ? n : n + 1));
  };

  return (
    <Fragment>
      {children?.({ step, values: store, setStep })}
      {forms.map(({ reshape, children, onError, onSuccess, ...restFormProps }, index) => (
        <Form
          key={`${index}`}
          {...restFormProps}
          reshape={(values) => {
            const newValues = { ...store, ...values };
            return reshape ? reshape(newValues) : newValues;
          }}
          onError={handleError(onError)}
          onSuccess={handleSuccess(onSuccess)}
        >
          {({ values, ...rest }) => {
            const isActive = step - 1 === index;
            return isActive ? (
              <View
                exit={{ opacity: 0, translateX: -screenWidth }}
                from={{ translateX: screenWidth }}
                animate={{ translateX: 0 }}
                transition={{ type: 'timing' }}
              >
                {children({ ...rest, values: { ...store, ...values }, setStep, setStore })}
              </View>
            ) : null;
          }}
        </Form>
      ))}
    </Fragment>
  );
}
