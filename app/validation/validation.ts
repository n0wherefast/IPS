import * as yup from 'yup'

export const validationSchema = yup.object().shape({
          name: yup.string().required(),
          date: yup.date().required(),
          email: yup.string().email().required(),
          message: yup.string().required(),
          terms: yup.boolean().required(),
          phone: yup.number().required(),
          address:yup.string().required(),
          numberOfAdults:yup.number().positive((e)=>console.log(e)).integer().required(),
          from6upto10years:yup.number().positive((e)=>console.log(e)).integer().required(),
})