<script setup lang="ts">
import { computed, useId } from 'vue'

interface TextareaProps {
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  error?: string
  id?: string
  rows?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: 'Введіть текст',
  label: '',
  disabled: false,
  required: false,
  error: '',
  id: '',
  rows: 3,
})

const model = defineModel<string>({
  required: false,
  default: '',
})

const defaultInputId = useId()
const inputId = computed(() => props.id || defaultInputId)

const emit = defineEmits<{
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()
</script>

<template>
  <div class="flex flex-col w-full tracking-wide text-[#2C2C2C]">
    <div class="flex justify-between mb-2">
      <label v-if="label" :for="inputId" class="pl-4.5 text-xs font-normal">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
    </div>

    <textarea
      :id="inputId"
      :placeholder="placeholder"
      v-model="model"
      :data-invalid="props.error"
      :data-has-error="Boolean(props.error)"
      :data-disabled="disabled"
      :disabled="disabled"
      :required="required"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      :rows="rows"
      class="resize-none w-full text-sm leading-5 rounded-sm border-[#2C2C2C1A] border py-3.5 px-4.5 focus:outline-none focus:border-[#F3743D]"
    />

    <p v-if="error" :id="`${inputId}-error`" class="mt-1 text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
textarea[data-has-error='true'] {
  border-color: #f56565;
}

textarea[data-has-error='true']:focus {
  border-color: #f56565;
}

textarea[data-disabled='true'] {
  background-color: #f7fafc;
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
