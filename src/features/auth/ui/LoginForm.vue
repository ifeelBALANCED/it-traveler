<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import FormSection from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { ButtonVariants } from '@/shared/types'
import { useAuthForm } from '@/features/auth'

const { loginForm, loginValues, loginErrors, loginEmailAttrs, loginPasswordAttrs, handleLogin } =
  useAuthForm()

function submit() {
  handleLogin((values) => {
    console.log('LOGIN PAYLOAD:', values)
  })
}
</script>

<template>
  <FormSection>
    <Input
      name="email"
      v-model="loginValues.email"
      v-bind="loginEmailAttrs"
      label="Email"
      placeholder="email@example.com"
      type="email"
      :error="loginErrors.email"
      required
    />

    <PasswordInput
      name="password"
      v-model="loginValues.password"
      v-bind="loginPasswordAttrs"
      label="Password"
      placeholder="********"
      :error="loginErrors.password"
      required
    />

    <Button
      class="mt-auto font-bold"
      :variant="ButtonVariants.Gradient"
      :disabled="!loginForm.meta.value.valid || loginForm.meta.value.pending"
      @click.prevent="submit"
    >
      Log in
    </Button>
  </FormSection>
</template>
