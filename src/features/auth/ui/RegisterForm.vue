<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ButtonVariants } from '@/shared/types'
import { default as FormSection } from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { useAuthForm } from '@/features/auth'
import { storeToRefs } from 'pinia'

const authForm = useAuthForm()
const { r$ } = storeToRefs(authForm)

async function submit() {
  const { valid, data } = await r$.value.$validate()
  if (valid) {
    console.log(data)
  }
}
</script>

<template>
  <FormSection>
    <Input
      v-model="r$.$fields.register.$fields.username.$value"
      :field="r$.$fields.register.$fields.username"
      label="Ім'я користувача"
      placeholder="Введіть ім'я користувача"
      :required="r$.$fields.register.$fields.username.$rules.required.$active"
    />

    <Input
      v-model="r$.$fields.register.$fields.email.$value"
      :field="r$.$fields.register.$fields.email"
      label="Електронна пошта"
      placeholder="email@example.com"
      type="email"
      :required="r$.$fields.register.$fields.email.$rules.required.$active"
    />

    <PasswordInput
      v-model="r$.$fields.register.$fields.password.$value"
      :field="r$.$fields.register.$fields.password"
      label="Пароль"
      placeholder="********"
      type="password"
      :required="r$.$fields.register.$fields.password.$rules.required.$active"
    />

    <PasswordInput
      v-model="r$.$fields.register.$fields.confirmPassword.$value"
      :field="r$.$fields.register.$fields.confirmPassword"
      label="Підтвердження пароля"
      placeholder="********"
      :required="r$.$fields.register.$fields.confirmPassword.$rules.required.$active"
    />

    <Button @click.prevent="submit" :variant="ButtonVariants.Gradient" class="font-bold mt-auto">
      Створити акаунт
    </Button>
  </FormSection>
</template>
