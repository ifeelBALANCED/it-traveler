import { useForm, type FormActions } from 'vee-validate'
import { isAxiosError } from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import { type ZodSchema, type z } from 'zod'
import { ref } from 'vue'

interface AuthConfig<Schema extends ZodSchema> {
  schema: Schema
  initialValues: z.infer<Schema>
  requestFn: (values: z.infer<Schema>) => Promise<void>
  onError?: (error: unknown, actions: FormActions<z.infer<Schema>>) => void
}

export function useAuthForm<Schema extends ZodSchema>({
  schema,
  initialValues,
  requestFn,
  onError,
}: AuthConfig<Schema>) {
  const isLoading = ref(false)
  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })

  const defaultErrorHandler = (error: unknown, actions: FormActions<z.infer<Schema>>) => {
    if (isAxiosError(error) && error.response?.data?.errors) {
      actions.setErrors(error.response.data.errors)
    }
  }

  const onSubmit = handleSubmit(async (values, actions) => {
    try {
      isLoading.value = true
      await requestFn(values)
    } catch (error) {
      if (onError) {
        onError(error, actions)
      } else {
        defaultErrorHandler(error, actions)
      }
    } finally {
      isLoading.value = false
    }
  })

  return {
    onSubmit,
    isLoading,
  }
}
