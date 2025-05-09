<script setup lang="ts">
import { reactive } from 'vue'
import { PasswordInput, Input, Button } from '@/shared/ui'
import { ButtonVariants } from '@/shared/types'
import { default as FormSection } from './FormSection.vue'

const loginForm = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <FormSection>
    <Input v-model="loginForm.email" label="Електронна пошта" placeholder="email@gmail.com" />
    <PasswordInput v-model="loginForm.password" placeholder="*************" label="Пароль" />
    <Button type="submit" :variant="ButtonVariants.Gradient" class="font-bold mt-auto"
      >Увійти</Button
    >
  </FormSection>
</template>

<style scoped></style>
