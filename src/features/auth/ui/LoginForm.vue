<script setup lang="ts">
import { Form } from 'vee-validate'
import FormSection from './FormSection.vue'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { useAuthForm } from '../model'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password-input'

const { login } = useAuthForm()
</script>

<template>
  <FormSection>
    <Form
      class="flex flex-col space-y-5 w-full h-full"
      :validation-schema="login.schema"
      @submit.prevent="login.submit()"
    >
      <Input
        name="email"
        type="email"
        label="Електронна пошта"
        placeholder="Ваша електронна адреса"
        required
      />
      <PasswordInput name="password" label="Пароль" placeholder="Ваш пароль" required />

      <Button class="mt-auto font-bold" :variant="ButtonVariants.Gradient" type="submit">
        Увійти
      </Button>
    </Form>
  </FormSection>
</template>
