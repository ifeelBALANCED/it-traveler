<script setup lang="ts">
import { ref, computed, defineModel, useAttrs, useId } from 'vue'
import { Input } from '../input'
import { Icon } from '@/shared/ui'

interface PasswordInputProps {
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  error?: string
  id?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PasswordInputProps>(), {
  placeholder: 'Введіть пароль',
  label: 'Пароль',
  disabled: false,
  required: false,
  error: '',
  id: '',
})

const attrs = useAttrs()
const password = defineModel<string>({ default: '', required: false })
const showPassword = ref(false)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))
const isInvalid = computed(() => Boolean(props.error))

const defaultId = useId()
const inputId = computed(() => props.id || defaultId)

const inputBind = computed(() => ({
  ...attrs,
  type: inputType.value,
  placeholder: props.placeholder,
  disabled: props.disabled,
  required: props.required,
  id: inputId.value,
  'aria-invalid': isInvalid.value ?? undefined,
}))

function toggleVisibility() {
  showPassword.value = !showPassword.value
}

const eyeIcon = computed(() => (showPassword.value ? 'eye-hidden' : 'eye-visible'))
</script>

<template>
  <div class="w-full">
    <Input
      v-model="password"
      v-bind="inputBind"
      :label="props.label"
      :icon="Icon"
      icon-position="right"
      :icon-component-props="{
        name: eyeIcon,
        class: 'h-5 w-5 text-gray-400 hover:text-gray-600',
      }"
      @icon-click="toggleVisibility"
    >
      <template #icon>
        <Icon :name="eyeIcon" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </template>
    </Input>

    <p v-if="props.error" class="mt-1 text-sm text-red-500">
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
