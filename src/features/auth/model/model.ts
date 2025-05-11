import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RegleExternalErrorTree } from '@regle/core'
import { useGlobalRegle, strongPassword } from '@/shared/lib/validations'
import { email, maxLength, minLength, required, sameAs, withMessage } from '@regle/rules'

export interface AuthForm {
  login: {
    email: string
    password: string
  }
  register: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
}

export const useAuthForm = defineStore('authForm', () => {
  const externalErrors = ref<RegleExternalErrorTree<AuthForm>>({})
  const form = ref<AuthForm>({
    login: {
      email: '',
      password: '',
    },
    register: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { r$ } = useGlobalRegle(
    form,
    {
      login: {
        email: {
          required: withMessage(required, 'Email is required'),
          email: withMessage(email, 'Please enter a valid email address'),
        },
        password: {
          required: withMessage(required, 'Password is required'),
          minLength: withMessage(minLength(8), 'Password must contain at least 8 characters'),
          strongPassword: withMessage(
            strongPassword(),
            'Password must contain uppercase and lowercase letters, numbers, and special characters',
          ),
          maxLength: withMessage(maxLength(30), 'Password cannot exceed 30 characters'),
        },
      },
      register: {
        username: {
          required: withMessage(required, 'Username is required'),
          minLength: withMessage(minLength(3), 'Username must contain at least 3 characters'),
          maxLength: withMessage(maxLength(15), 'Username cannot exceed 15 characters'),
        },
        email: {
          required: withMessage(required, 'Email is required'),
          email: withMessage(email, 'Please enter a valid email address'),
        },
        password: {
          required: withMessage(required, 'Password is required'),
          minLength: withMessage(minLength(8), 'Password must contain at least 8 characters'),
          maxLength: withMessage(maxLength(30), 'Password cannot exceed 30 characters'),
          strongPassword: withMessage(
            strongPassword(),
            'Password must contain uppercase and lowercase letters, numbers, and special characters',
          ),
        },
        confirmPassword: {
          required: withMessage(required, 'Password is required'),
          minLength: withMessage(minLength(8), 'Password must contain at least 8 characters'),
          maxLength: withMessage(maxLength(30), 'Password cannot exceed 30 characters'),
          sameAs: withMessage(
            sameAs(() => form.value.register.password),
            'Passwords do not match',
          ),
        },
      },
    },
    { externalErrors },
  )

  return { r$ }
})
