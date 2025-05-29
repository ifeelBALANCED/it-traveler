<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { useField } from 'vee-validate'
import { Input } from '../input'
import { Icon } from '@/shared/ui/icon'

interface PasswordInputProps {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id?: string
  extraClass?: string
}

const props = withDefaults(defineProps<PasswordInputProps>(), {
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  id: '',
  extraClass: '',
})

defineOptions({ inheritAttrs: false })

const passwordModel = defineModel<string>({
  default: '',
  required: false,
})

const emit = defineEmits<{
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const { name, label, placeholder, disabled, required, id } = toRefs(props)

const {
  value: fieldValue,
  errorMessage,
  handleBlur,
} = useField(name.value, undefined, { initialValue: passwordModel.value })

const show = ref(false)
const inputType = computed(() => (show.value ? 'text' : 'password'))
const eyeIcon = computed(() => (show.value ? 'eye-hidden' : 'eye-visible'))
const toggleEye = () => (show.value = !show.value)

const inputId = computed(() => id.value || name.value)

function onBlur(e: FocusEvent) {
  handleBlur(e)
  emit('blur', e)
}
</script>

<template>
  <Input
    v-model="fieldValue"
    :name="name"
    :id="inputId"
    :label="label"
    :placeholder="placeholder"
    :type="inputType"
    :disabled="disabled"
    :required="required"
    :icon="Icon"
    icon-position="right"
    :icon-component-props="{
      name: eyeIcon,
      class: 'h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer',
    }"
    @focus="emit('focus', $event)"
    @blur="onBlur"
    @icon-click="toggleEye"
    v-bind="$attrs"
  >
    <template #icon>
      <Icon :name="eyeIcon" class="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
    </template>
  </Input>

  <p v-if="errorMessage" :id="`${inputId}-error`" class="mt-1 text-sm text-red-500">
    {{ errorMessage }}
  </p>
</template>
