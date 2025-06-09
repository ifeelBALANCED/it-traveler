import { useForm } from 'vee-validate'
import { LocationFormSchema } from './schema'
import { toTypedSchema } from '@vee-validate/zod'

const FORM_INITIAL_VALUES = {
  title: '',
  description: '',
  latitude: 0,
  longitude: 0,
  address: '',
  imageUrl: '',
}

export const useAddLocationForm = () => {
  return useForm({
    validationSchema: toTypedSchema(LocationFormSchema),
    initialValues: FORM_INITIAL_VALUES,
  })
}

export const useEditLocationForm = () => {
  return useForm({
    validationSchema: toTypedSchema(LocationFormSchema),
    initialValues: FORM_INITIAL_VALUES,
  })
}
