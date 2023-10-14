import { isValidNumberForRegion } from 'libphonenumber-js';
import * as Yup from 'yup';

export default {
  ...Yup,
  code: Yup.string().length(6, ''),
  name: Yup.string().max(20, 'Maximum Length is 20'),
  amount: Yup.number().min(1000, 'Minimum amount is 10000 Ks').typeError(' ').required('Please enter amount'),
  mobile: Yup.string()
    .test('is-myanmar-number', 'Invalid mobile number', (value) => (value ? isValidNumberForRegion(value, 'MM') : true))
    .required('Please enter mobile no'),
};
