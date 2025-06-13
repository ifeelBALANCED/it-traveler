<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ButtonVariants } from '@/shared/types'
import FormSection from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { useRegisterForm } from '../model'

const { onSubmit } = useRegisterForm()
</script>

<template>
  <FormSection>
    <form
      class="flex flex-col space-y-5 w-full h-full"
      data-testid="RegisterForm-form"
      data-test="RegisterForm.form"
      @submit.prevent="onSubmit"
    >
      <Input
        name="name"
        label="Ім'я користувача"
        placeholder="Введіть ім'я користувача"
        required
        data-testid="RegisterForm-name"
        data-test="RegisterForm.name"
      />

      <Input
        name="email"
        label="Електронна пошта"
        placeholder="email@example.com"
        type="email"
        required
        data-testid="RegisterForm-email"
        data-test="RegisterForm.email"
      />

      <PasswordInput
        name="password"
        label="Пароль"
        placeholder="********"
        required
        data-testid="RegisterForm-password"
        data-test="RegisterForm.password"
      />

      <PasswordInput
        name="confirmPassword"
        label="Підтвердження пароля"
        placeholder="********"
        required
        data-testid="RegisterForm-confirmPassword"
        data-test="RegisterForm.confirmPassword"
      />

      <Button
        class="font-bold mt-auto"
        :variant="ButtonVariants.Gradient"
        type="submit"
        data-testid="RegisterForm-submit"
        data-test="RegisterForm.submit"
      >
        Створити акаунт
      </Button>
    </form>
  </FormSection>
</template>
