<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import SharedInput from './SharedInput.vue'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted with:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" novalidate>
    <SharedInput name="email" type="email" label="Email" placeholder="your.email@example.com" />

    <SharedInput name="password" type="password" label="Password" placeholder="••••••••" />

    <button
      type="submit"
      class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </form>
</template>

<style scoped>
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
