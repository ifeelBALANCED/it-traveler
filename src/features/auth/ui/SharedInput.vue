<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  type?: string
  label?: string
  placeholder?: string
}>()

const { name, type = 'text', label = '', placeholder = '' } = props

const { value, errorMessage, handleBlur, handleChange } = useField<string>(name)
</script>

<template>
  <div class="shared-input-wrapper">
    <label v-if="label" :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <input
      :id="name"
      :name="name"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />

    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.shared-input-wrapper {
  margin-bottom: 1rem;
}
</style>
