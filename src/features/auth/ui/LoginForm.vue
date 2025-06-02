<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import FormSection from './FormSection.vue'
import { PasswordInput } from '@/shared/ui/password-input'
import { ButtonVariants } from '@/shared/types'
import { useAuthForm } from '@/features/auth'
import { elysiaClient } from '@/shared/api'

const { loginValues, loginErrors, loginEmailAttrs, loginPasswordAttrs } = useAuthForm()

function submit() {
  elysiaClient.postApiAuthLogin({
    email: 'loginValues.email',
    password: 'loginValues.password',
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

    <Button class="mt-auto font-bold" :variant="ButtonVariants.Gradient" @click.prevent="submit">
      Log in
    </Button>
  </FormSection>
</template>
