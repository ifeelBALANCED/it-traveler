<script setup lang="ts">
import { ref, computed, useId, toRefs, useAttrs } from 'vue'
import { Input } from '@/shared/ui/input'
import { Icon } from '@/shared/ui/icon'
import type {
  Maybe,
  RegleEnforceCustomRequiredRules,
  RegleFieldStatus,
  InferRegleShortcuts,
} from '@regle/core'
import { useGlobalRegle } from '@/shared/lib/validations'

type FieldWithStrong = RegleFieldStatus<
  string | undefined,
  RegleEnforceCustomRequiredRules<typeof useGlobalRegle, 'strongPassword'>,
  InferRegleShortcuts<typeof useGlobalRegle>
>
type FieldBasic = RegleFieldStatus<
  string | undefined,
  never,
  InferRegleShortcuts<typeof useGlobalRegle>
>

export type PasswordField = FieldWithStrong | FieldBasic

interface PasswordInputProps {
  field: PasswordField
  placeholder?: string
  label?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<PasswordInputProps>(), {
  placeholder: 'Enter password',
  label: 'Password',
  disabled: false,
  required: false,
  id: '',
})

const { field, placeholder, label, disabled, required, id } = toRefs(props)
const attrs = useAttrs()

const showPassword = ref(false)
const password = defineModel<Maybe<string>>({ required: true })
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))
const eyeIcon = computed(() => (showPassword.value ? 'eye-hidden' : 'eye-visible'))
const toggleVisibility = () => (showPassword.value = !showPassword.value)

const defaultId = useId()
const inputId = computed(() => id.value || defaultId)

const inputAttrs = computed(() => ({
  id: inputId.value,
  type: inputType.value,
  placeholder: placeholder.value,
  disabled: disabled.value,
  required: required.value,
  ...attrs,
}))
</script>

<template>
  <div class="w-full">
    <Input
      :field="field"
      v-model="password"
      v-bind="inputAttrs"
      :label="label"
      :icon="Icon"
      :type="inputType"
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
  </div>
</template>
