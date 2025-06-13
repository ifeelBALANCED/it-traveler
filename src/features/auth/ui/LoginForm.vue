<script setup lang="ts">
import FormSection from './FormSection.vue'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password-input'
import { useLoginForm } from '../model'

const { onSubmit, isLoading } = useLoginForm()
</script>

<template>
  <FormSection>
    <form
      class="flex flex-col space-y-5 w-full h-full"
      data-testid="LoginForm-form"
      data-test="LoginForm.form"
      @submit.prevent="onSubmit"
    >
      <Input
        name="email"
        label="Електронна пошта"
        placeholder="email@example.com"
        type="email"
        required
        data-testid="LoginForm-email"
        data-test="LoginForm.email"
      />

      <PasswordInput
        name="password"
        label="Пароль"
        placeholder="********"
        required
        data-testid="LoginForm-password"
        data-test="LoginForm.password"
      />

      <Button
        type="submit"
        class="mt-auto font-bold"
        :variant="ButtonVariants.Gradient"
        :disabled="isLoading"
        :loading="isLoading"
        data-testid="LoginForm-submit"
        data-test="LoginForm.submit"
      >
        {{ isLoading ? 'Завантаження...' : 'Увійти' }}
      </Button>
    </form>
  </FormSection>
</template>
