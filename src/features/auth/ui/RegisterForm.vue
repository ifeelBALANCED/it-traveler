<script setup lang="ts">
import { reactive } from 'vue'
import { PasswordInput, Input, Button } from '@/shared/ui'
import { ButtonVariants } from '@/shared/types'
import { default as FormSection } from './FormSection.vue'

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
})
</script>

<template>
  <FormSection>
    <Input v-model="registerForm.username" label="Повне ім’я" placeholder="Ім'я" class="mb-4" />
    <Input
      v-model="registerForm.email"
      label="Електронна пошта"
      placeholder="email@gmail.com"
      type="email"
    />
    <PasswordInput v-model="registerForm.password" placeholder="*************" label="Пароль" />
    <Button type="submit" :variant="ButtonVariants.Gradient" class="font-bold"
      >Створити аккаунт</Button
    >
  </FormSection>
</template>

<style scoped></style>
