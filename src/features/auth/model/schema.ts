import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email('Невірний формат електронної пошти').default(''),
  password: z
    .string()
    .min(6, 'Пароль повинен містити принаймні 6 символів')
    .max(100, 'Пароль повинен містити менше 100 символів')
    .default(''),
})

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Ім'я повинно містити принаймні 2 символи")
      .max(50, "Ім'я повинно містити менше 50 символів")
      .default(''),
    email: z.string().email('Невірний формат електронної пошти').default(''),
    password: z
      .string()
      .min(6, 'Пароль повинен містити принаймні 6 символів')
      .max(100, 'Пароль повинен містити менше 100 символів')
      .default(''),
    confirmPassword: z
      .string()
      .min(6, 'Пароль повинен містити принаймні 6 символів')
      .max(100, 'Пароль повинен містити менше 100 символів')
      .default(''),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  })
