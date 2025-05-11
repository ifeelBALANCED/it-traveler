<script setup lang="ts">
import { computed, defineProps, defineEmits, defineModel, toRefs, useAttrs, useId } from 'vue'
import type { InferRegleShortcuts, RegleFieldStatus, Maybe } from '@regle/core'
import { useGlobalRegle } from '@/shared/lib/validations'
import { FieldError } from '../field-error'

type FieldShortcuts = InferRegleShortcuts<typeof useGlobalRegle>

interface TextareaProps {
  field?: RegleFieldStatus<string | undefined, never, FieldShortcuts>
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id?: string
  rows?: number
  extraClass?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  field: undefined,
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  id: '',
  rows: 3,
  extraClass: '',
})

defineEmits<{
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const { field, label, placeholder, disabled, required, id, rows, extraClass } = toRefs(props)
const attrs = useAttrs()
const textareaModel = defineModel<Maybe<string>>({ required: true, default: '' })
const defaultId = useId()
const inputId = computed(() => id.value || defaultId)

const baseClasses = computed(() =>
  [
    'mt-1 block w-full resize-none rounded-md border py-2 px-3 text-sm shadow-sm focus:outline-none',
    extraClass.value,
  ]
    .filter(Boolean)
    .join(' '),
)

const textareaAttrs = computed(() => ({
  id: inputId.value,
  placeholder: placeholder.value,
  disabled: disabled.value,
  required: required.value,
  rows: rows.value,
  ...attrs,
}))
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="inputId" class="mb-1 text-xs text-gray-700 font-normal tracking-wide">
      {{ label }}<span v-if="required" class="ml-1 text-red-500">*</span>
    </label>

    <textarea
      v-model="textareaModel"
      v-bind="textareaAttrs"
      :class="[
        baseClasses,
        {
          'border-[#2C2C2C1A] focus:border-[#F3743D]': !field?.$error,
          'border-orange-300 focus:border-orange-300': field?.$pending,
          'border-red-400 focus:border-red-400': field?.$error,
        },
      ]"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      :aria-invalid="field?.$error"
      :aria-describedby="field?.$error ? `${inputId}-error` : undefined"
    ></textarea>

    <FieldError :errors="field?.$errors" :id="`${inputId}-error`" class="mt-1" />
  </div>
</template>

<style scoped>
textarea[data-disabled='true'] {
  background-color: #f7fafc;
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
