import { reactive } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/valibot'
import * as v from 'valibot'

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const emailSchema = v.pipe(
  v.string('Email is required'),
  v.email('Please enter a valid email address'),
)

const passwordSchema = v.pipe(
  v.string('Password is required'),
  v.minLength(8, 'Password must contain at least 8 characters'),
  v.maxLength(30, 'Password cannot exceed 30 characters'),
  v.regex(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+/,
    'Password must contain uppercase, lowercase, number & special character',
  ),
)

export function useAuthForm() {
  const loginForm = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toTypedSchema(
      v.object({
        email: emailSchema,
        password: passwordSchema,
      }),
    ),
  })

  const [loginEmail, loginEmailAttrs] = loginForm.defineField('email')
  const [loginPassword, loginPasswordAttrs] = loginForm.defineField('password')

  const registerSchema = v.pipe(
    v.object({
      username: v.pipe(
        v.string('Username is required'),
        v.minLength(3, 'Username must contain at least 3 characters'),
        v.maxLength(15, 'Username cannot exceed 15 characters'),
      ),
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: v.pipe(
        v.string('Please confirm your password'),
        v.minLength(8, 'Password must contain at least 8 characters'),
        v.maxLength(30, 'Password cannot exceed 30 characters'),
      ),
    }),
    v.forward(
      v.check((data) => data.confirmPassword === data.password, 'Passwords do not match'),
      ['confirmPassword'],
    ),
  )

  const registerForm = useForm<RegisterFormValues>({
    initialValues: reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }),
    validationSchema: toTypedSchema(registerSchema),
  })

  const [registerUsername, registerUsernameAttrs] = registerForm.defineField('username')
  const [registerEmail, registerEmailAttrs] = registerForm.defineField('email')
  const [registerPassword, registerPasswordAttrs] = registerForm.defineField('password')
  const [registerConfirmPassword, registerConfirmPasswordAttrs] =
    registerForm.defineField('confirmPassword')

  return {
    loginForm,
    loginValues: loginForm.values,
    loginErrors: loginForm.errors,
    handleLogin: loginForm.handleSubmit,
    loginEmail,
    loginEmailAttrs,
    loginPassword,
    loginPasswordAttrs,

    registerForm,
    registerValues: registerForm.values,
    registerErrors: registerForm.errors,
    handleRegister: registerForm.handleSubmit,
    registerUsername,
    registerUsernameAttrs,
    registerEmail,
    registerEmailAttrs,
    registerPassword,
    registerPasswordAttrs,
    registerConfirmPassword,
    registerConfirmPasswordAttrs,
  }
}
