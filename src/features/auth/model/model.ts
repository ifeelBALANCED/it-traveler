import { elysiaClient } from '@/shared/api'
import { LoginFormSchema, RegisterFormSchema } from './schema'
import { useAsync } from '@/shared/lib/composables'
import { useSession } from '@/entities/session'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { ROUTES } from '@/shared/types'

export function useLoginForm() {
  const session = useSession()
  const router = useRouter()

  return useAsync({
    schema: LoginFormSchema,
    initialValues: { email: '', password: '' },
    requestFn: async (values) => {
      const { data } = await elysiaClient.postApiAuthLogin(values)
      return data
    },
    onSuccess: async (creds) => {
      session.save(creds)
      toast.success('Вхід успішний')
      await router.push({ name: ROUTES.HOME })
    },
  })
}

export function useRegisterForm() {
  const session = useSession()
  const router = useRouter()

  return useAsync({
    schema: RegisterFormSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    requestFn: async (values) => {
      const { data } = await elysiaClient.postApiAuthRegister(values)
      return data
    },
    onSuccess: async (creds) => {
      session.save(creds)
      toast.success('Реєстрація успішна')
      await router.push({ name: ROUTES.HOME })
    },
  })
}
