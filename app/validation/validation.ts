import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  date: yup.date().typeError('Please enter a valid date').required('Date is required'),
  email: yup.string().trim().email('Please enter a valid email').required('Email is required'),
  message: yup.string().trim().min(2, 'Message is too short').required('Message is required'),
  terms: yup.boolean().oneOf([true], 'Please accept the terms and conditions').required('Please accept the terms and conditions'),
  phone: yup.string().trim().min(6, 'Phone number is too short').required('Phone is required'),
  address: yup.string().trim().required('Address is required'),
  pack: yup.string().trim().required('Please select a package'),
  numberOfAdults: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : Number(value)))
    .min(1, 'At least one adult is required')
    .required('Adults count is required'),
  numberOfKidsUnder10: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : Number(value)))
    .min(0, 'Kids count cannot be negative')
    .required('Kids count is required'),
  time: yup.string().nullable(),
})