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
    <form class="flex flex-col space-y-5 w-full h-full" @submit.prevent="onSubmit">
      <Input
        name="email"
        label="Електронна пошта"
        placeholder="email@example.com"
        type="email"
        required
      />

      <PasswordInput name="password" label="Пароль" placeholder="********" required />

      <Button
        type="submit"
        class="mt-auto font-bold"
        :variant="ButtonVariants.Gradient"
        :disabled="isLoading"
        :loading="isLoading"
      >
        {{ isLoading ? 'Завантаження...' : 'Увійти' }}
      </Button>
    </form>
  </FormSection>
</template>
