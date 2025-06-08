import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { ref } from 'vue'

interface AuthConfig<Schema extends z.ZodSchema> {
  schema: Schema
  initialValues: z.infer<Schema>
  requestFn: (values: z.infer<Schema>) => Promise<void>
}

export function useAuthForm<Schema extends z.ZodSchema>({
  schema,
  initialValues,
  requestFn,
}: AuthConfig<Schema>) {
  const isLoading = ref(false)
  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      isLoading.value = true
      await requestFn(values)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })

  return {
    onSubmit,
    isLoading,
  }
}
