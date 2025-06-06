import { useForm } from 'vee-validate'
import { LoginFormSchema, RegisterFormSchema } from './schema'

export function useAuthForm() {
  const { handleSubmit: handleLoginSubmit } = useForm({
    name: 'login',
    validationSchema: LoginFormSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit: handleRegisterSubmit } = useForm({
    name: 'register',
    validationSchema: RegisterFormSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const login = handleLoginSubmit((values) => {
    console.log('Submit', JSON.stringify(values, null, 2))
  })

  const register = handleRegisterSubmit((values) => {
    console.log('Submit', JSON.stringify(values, null, 2))
  })

  return {
    login: {
      submit: login,
      schema: LoginFormSchema,
    },
    register: {
      submit: register,
      schema: RegisterFormSchema,
    },
  }
}
