<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ButtonVariants } from '@/shared/types'
import FormSection from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { Form } from 'vee-validate'
import { useAuthForm } from '../model'

const { register } = useAuthForm()
</script>

<template>
  <FormSection>
    <Form
      class="flex flex-col space-y-5 w-full h-full"
      :validation-schema="register.schema"
      @submit.prevent="register.submit()"
    >
      <Input name="name" label="Ім'я користувача" placeholder="Введіть ім'я користувача" required />

      <Input
        name="email"
        label="Електронна пошта"
        placeholder="email@example.com"
        type="email"
        required
      />

      <PasswordInput name="password" label="Пароль" placeholder="********" required />

      <PasswordInput
        name="confirmPassword"
        label="Підтвердження пароля"
        placeholder="********"
        required
      />

      <Button class="font-bold mt-auto" :variant="ButtonVariants.Gradient" type="submit">
        Створити акаунт
      </Button>
    </Form>
  </FormSection>
</template>
