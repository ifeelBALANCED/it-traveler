import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { isAxiosError } from 'axios'
import { useAsyncState } from '@vueuse/core'
import type { ZodSchema, z } from 'zod'

export interface UseAsyncOptions<S extends ZodSchema, R = void> {
  schema: S
  initialValues: z.infer<S>
  requestFn: (values: z.infer<S>) => Promise<R>
  onError?: (error: unknown) => void
  onSuccess?: (response: R) => void
}

export function useAsync<S extends ZodSchema, R = void>(options: UseAsyncOptions<S, R>) {
  const { schema, initialValues, requestFn, onError, onSuccess } = options

  const form = useForm<z.infer<S>>({
    validationSchema: toTypedSchema(schema),
    initialValues,
  })
  const { handleSubmit, setErrors, handleReset } = form

  const payload = ref<z.infer<S> | null>(null)

  const defaultErrorHandler = (err: unknown) => {
    if (isAxiosError(err) && err.response?.data?.errors) {
      setErrors(err.response.data.errors)
    } else {
      console.error(err)
    }
  }

  const handleError = (err: unknown) => {
    if (onError) onError(err)
    else defaultErrorHandler(err)
  }

  const {
    state: data,
    isLoading,
    isReady,
    error,
    execute,
  } = useAsyncState<R | undefined>(
    () => {
      return payload.value !== null ? requestFn(payload.value) : Promise.resolve(undefined)
    },
    undefined,
    {
      immediate: false,
      resetOnExecute: false,
      onError: (e) => handleError(e),
    },
  )

  const onSubmit = handleSubmit(async (values) => {
    payload.value = values
    await execute()
    if (data.value) {
      onSuccess?.(data.value)
    }
  })

  return {
    onSubmit,
    isLoading,
    isReady,
    error,
    data,
    form,
    handleReset,
  }
}
