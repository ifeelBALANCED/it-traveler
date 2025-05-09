<script setup lang="ts">
import { computed, defineModel, useAttrs, useId } from 'vue'
import type { Component } from 'vue'

interface InputProps {
  type?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  error?: string
  id?: string
  class?: string
  icon?: Component
  iconPosition?: 'left' | 'right'
  iconComponentProps?: Record<string, unknown>
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false,
  required: false,
  error: '',
  id: '',
  class: '',
  icon: undefined,
  iconPosition: 'right',
  iconComponentProps: () => ({}),
})

const attrs = useAttrs()
const emit = defineEmits<{
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'icon-click', event: MouseEvent): void
}>()
const model = defineModel<string>({ default: '', required: false })

const defaultId = useId()
const inputId = computed(() => props.id || defaultId)
const hasIcon = computed(() => Boolean(props.icon))
const inputBind = computed(() => ({
  ...attrs,
  type: props.type,
  placeholder: props.placeholder,
  disabled: props.disabled,
  required: props.required,
  id: inputId.value,
  'data-has-error': Boolean(props.error),
  'data-disabled': props.disabled,
}))

const inputClasses = computed(() =>
  [
    'w-full text-sm leading-5 tracking-wide text-[#2C2C2C] rounded-sm border-[#2C2C2C1A] border py-3.5 px-4.5 focus:outline-none focus:border-[#F3743D]',
    props.class,
    hasIcon.value && props.iconPosition === 'left' ? 'pl-10' : '',
    hasIcon.value && props.iconPosition === 'right' ? 'pr-10' : '',
  ]
    .filter(Boolean)
    .join(' '),
)

const handleIconClick = (event: MouseEvent) => {
  emit('icon-click', event)
}
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      v-if="props.label"
      :for="inputId"
      class="mb-1 text-xs text-[#2C2C2C] font-normal tracking-wide"
    >
      {{ props.label }}
      <span v-if="props.required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative w-full">
      <input
        v-bind="inputBind"
        v-model="model"
        :aria-invalid="Boolean(props.error)"
        :aria-describedby="props.error ? `${inputId}-error` : undefined"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        :class="inputClasses"
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
          @click.stop="handleIconClick"
        >
          <slot name="icon">
            <component :is="icon" v-bind="iconComponentProps" class="h-5 w-5" />
          </slot>
        </button>
      </div>
    </div>

    <p v-if="props.error" :id="`${inputId}-error`" class="mt-1 text-sm text-red-500">
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
input[data-has-error='true'] {
  border-color: #f56565;
}
input[data-has-error='true']:focus {
  border-color: #f56565;
}
input[data-disabled='true'] {
  background-color: #f7fafc;
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
