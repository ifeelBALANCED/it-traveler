import { elysiaClient } from '@/shared/api'
import { LoginFormSchema, RegisterFormSchema } from './schema'
import { useAuthForm } from '@/shared/lib/form'
import { useSession } from '@/entities/session'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/shared/types'

export function useLoginForm() {
  const session = useSession()
  const router = useRouter()

  return useAuthForm({
    schema: LoginFormSchema,
    initialValues: { email: '', password: '' },
    requestFn: async (formValues) => {
      const { data: authCredentials, success } = await elysiaClient.postApiAuthLogin(formValues)
      if (success) {
        session.save(authCredentials)
        router.push({ name: ROUTES.HOME })
      }
    },
  })
}

export function useRegisterForm() {
  const session = useSession()
  const router = useRouter()

  return useAuthForm({
    schema: RegisterFormSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    requestFn: async (formValues) => {
      const { data: authCredentials, success } = await elysiaClient.postApiAuthRegister(formValues)
      if (success) {
        session.save(authCredentials)
        router.push({ name: ROUTES.HOME })
      }
    },
  })
}
