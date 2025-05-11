<script setup lang="ts">
import { computed, toRefs, useAttrs, useId } from 'vue'
import type { Component, InputTypeHTMLAttribute } from 'vue'
import type { InferRegleShortcuts, Maybe, RegleFieldStatus } from '@regle/core'
import { useGlobalRegle } from '@/shared/lib/validations'
import { FieldError } from '../field-error'
import type { PasswordField } from '../password-input/PasswordInput.vue'

type FieldShortcuts = InferRegleShortcuts<typeof useGlobalRegle>
type InputField = RegleFieldStatus<string | undefined, never, FieldShortcuts>

interface InputProps {
  field?: InputField | PasswordField
  label?: string
  placeholder?: string
  type?: InputTypeHTMLAttribute
  disabled?: boolean
  required?: boolean
  id?: string
  extraClass?: string
  icon?: Component
  iconPosition?: 'left' | 'right'
  iconComponentProps?: Record<string, unknown>
}

defineOptions({ inheritAttrs: false })
defineEmits<{
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'icon-click', event: MouseEvent): void
}>()

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false,
  required: false,
  id: '',
  extraClass: '',
  icon: undefined,
  iconPosition: 'right',
  iconComponentProps: () => ({}),
})

const {
  field,
  label,
  placeholder,
  type,
  disabled,
  required,
  id,
  extraClass,
  icon,
  iconPosition,
  iconComponentProps,
} = toRefs(props)
const attrs = useAttrs()

const inputModel = defineModel<Maybe<string | number>>({ required: true })

const defaultId = useId()
const inputId = computed(() => id.value || defaultId)

const baseClasses = computed(() =>
  [
    'w-full text-sm leading-5 tracking-wide text-[#2C2C2C] rounded-sm border py-3.5 px-4.5 focus:outline-none',
    extraClass.value,
  ]
    .filter(Boolean)
    .join(' '),
)

const hasIcon = computed(() => Boolean(icon.value))

const inputAttrs = computed(() => ({
  id: inputId.value,
  type: type.value,
  placeholder: placeholder.value,
  disabled: disabled.value,
  required: required.value,
  ...attrs,
}))
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="inputId" class="mb-1 text-xs text-gray-700 font-normal tracking-wide">
      {{ label }}<span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative w-full">
      <input
        v-model="inputModel"
        v-bind="inputAttrs"
        :class="[
          baseClasses,
          {
            'border-[#2C2C2C1A] focus:border-[#F3743D]': !field?.$error,
            'border-orange-300 focus:border-orange-300': field?.$pending,
            'border-red-400 focus:border-red-400': field?.$error,
            'pl-10': hasIcon && iconPosition === 'left',
            'pr-10': hasIcon && iconPosition === 'right',
          },
        ]"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :aria-invalid="Boolean(field?.$errors.length)"
        :aria-describedby="field?.$errors.length ? `${inputId}-error` : undefined"
      />

      <div
        v-if="hasIcon"
        class="absolute top-0 h-full flex items-center"
        :class="{
          'left-0 pl-3': iconPosition === 'left',
          'right-0 pr-3': iconPosition === 'right',
        }"
      >
        <button
          type="button"
          class="flex items-center justify-center h-full px-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          @click.stop="$emit('icon-click', $event)"
        >
          <slot name="icon">
            <component :is="icon" v-bind="iconComponentProps" class="h-5 w-5" />
          </slot>
        </button>
      </div>
    </div>
    <FieldError :errors="field?.$errors ?? []" :id="`${inputId}-error`" class="mt-1" />
  </div>
</template>
