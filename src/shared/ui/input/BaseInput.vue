<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
})
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="name" class="mb-1 text-xs text-gray-700 font-normal tracking-wide">
      {{ label }}<span v-if="required" class="ml-1 text-red-500">*</span>
    </label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${name}-error` : undefined"
      @input="handleChange"
      @blur="handleBlur"
      :data-invalid="!!errorMessage"
    />

    <p v-if="errorMessage" :id="`${name}-error`" class="mt-1 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped lang="css">
input {
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25;
  letter-spacing: 0.025em;
  color: #2c2c2c;
  border-radius: 0.125rem;
  border: 1px solid;
  padding: 0.875rem 0.75rem;

  &:focus {
    outline: none;
  }

  &[data-invalid='true'] {
    border-color: #f87171;

    &:focus {
      border-color: #f87171;
    }
  }

  &[data-invalid='false'] {
    border-color: rgba(44, 44, 44, 0.1);

    &:focus {
      border-color: #f3743d;
    }
  }
}
</style>
