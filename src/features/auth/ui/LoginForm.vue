<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
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
  <form-section>
    <Input
      v-model="r$.$fields.login.$fields.email.$value"
      :field="r$.$fields.login.$fields.email"
      label="Email"
      placeholder="email@example.com"
      type="email"
      :required="r$.$fields.login.$fields.email.$rules.required.$active"
    />

    <PasswordInput
      v-model="r$.$fields.login.$fields.password.$value"
      :field="r$.$fields.login.$fields.password"
      label="Password"
      placeholder="********"
      type="password"
      :required="r$.$fields.login.$fields.password.$rules.required.$active"
    />
    <Button
      @click.prevent="submit"
      :disabled="r$.$fields.login.$invalid || r$.$fields.login.$pending"
      :loading="r$.$fields.login.$pending"
      :variant="ButtonVariants.Gradient"
      class="font-bold mt-auto"
      >Log in</Button
    >
  </form-section>
</template>
