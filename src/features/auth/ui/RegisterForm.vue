<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ButtonVariants } from '@/shared/types'
import FormSection from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { useAuthForm } from '@/features/auth'

const {
  registerForm,
  registerValues,
  registerErrors,
  registerUsernameAttrs,
  registerEmailAttrs,
  registerPasswordAttrs,
  registerConfirmPasswordAttrs,
  handleRegister,
} = useAuthForm()

const submit = handleRegister((values) => {
  console.log('Register payload:', values)
})
</script>

<template>
  <FormSection>
    <Input
      name="username"
      v-model="registerValues.username"
      v-bind="registerUsernameAttrs"
      label="Ім'я користувача"
      placeholder="Введіть ім'я користувача"
      :error="registerErrors.username"
      required
    />

    <Input
      name="email"
      v-model="registerValues.email"
      v-bind="registerEmailAttrs"
      label="Електронна пошта"
      placeholder="email@example.com"
      type="email"
      :error="registerErrors.email"
      required
    />

    <PasswordInput
      name="password"
      v-model="registerValues.password"
      v-bind="registerPasswordAttrs"
      label="Пароль"
      placeholder="********"
      :error="registerErrors.password"
      required
    />

    <PasswordInput
      name="confirmPassword"
      v-model="registerValues.confirmPassword"
      v-bind="registerConfirmPasswordAttrs"
      label="Підтвердження пароля"
      placeholder="********"
      :error="registerErrors.confirmPassword"
      required
    />

    <Button
      class="font-bold mt-auto"
      :variant="ButtonVariants.Gradient"
      :disabled="!registerForm.meta.value.valid || registerForm.meta.value.pending"
      :loading="registerForm.meta.value.pending"
      @click.prevent="submit"
    >
      Створити акаунт
    </Button>
  </FormSection>
</template>
