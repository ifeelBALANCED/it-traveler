<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    id?: string
    rows?: number
    extraClass?: string
    rules?: string | object
  }>(),
  {
    label: '',
    placeholder: '',
    disabled: false,
    required: false,
    id: '',
    rows: 3,
    extraClass: '',
    rules: undefined,
  },
)

const textareaModel = defineModel<string>({
  default: '',
  required: false,
})

defineOptions({ inheritAttrs: false })
const emit = defineEmits<{
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const { name, label, placeholder, disabled, required, id, rows, extraClass } = toRefs(props)

const {
  value: fieldValue,
  errorMessage,
  meta,
  handleBlur,
} = useField(name.value, undefined, {
  initialValue: textareaModel.value,
})

const inputId = computed(() => id.value || name.value)

const baseClasses =
  'mt-1 block w-full resize-none rounded-md border py-2 px-3 text-sm shadow-sm focus:outline-none'

const stateClasses = computed(() => {
  if (meta.pending) return 'border-orange-300 focus:border-orange-300'
  if (!meta.valid) return 'border-red-400 focus:border-red-400'
  return 'border-[#2C2C2C1A] focus:border-[#F3743D]'
})

function onBlur(e: FocusEvent) {
  handleBlur(e)
  emit('blur', e)
}
</script>

<template>
  <div class="flex flex-col w-full" data-testid="BaseTextarea-group" data-test="BaseTextarea.group">
    <label
      v-if="label"
      :for="inputId"
      class="mb-1 text-xs text-gray-700 font-normal tracking-wide"
      data-testid="BaseTextarea-label"
      data-test="BaseTextarea.label"
    >
      {{ label }}<span v-if="required" class="ml-1 text-red-500" aria-hidden="true">*</span>
    </label>

    <textarea
      v-model="fieldValue"
      :id="inputId"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :aria-required="required ? 'true' : 'false'"
      :aria-invalid="!meta.valid"
      :aria-describedby="!meta.valid ? `${inputId}-error` : undefined"
      data-testid="BaseTextarea-textarea"
      data-test="BaseTextarea.textarea"
      :class="[baseClasses, stateClasses, extraClass]"
      @focus="emit('focus', $event)"
      @blur="onBlur"
      v-bind="$attrs"
    />

    <p
      v-if="errorMessage"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-red-500"
      role="alert"
      data-testid="BaseTextarea-error"
      data-test="BaseTextarea.error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
textarea[disabled] {
  background-color: #f7fafc;
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
