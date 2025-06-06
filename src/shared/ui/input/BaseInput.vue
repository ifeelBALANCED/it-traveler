<!-- <script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useField } from 'vee-validate'
import type { Component, InputTypeHTMLAttribute } from 'vue'

interface Props {
  name: string
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
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  required: false,
  id: '',
  extraClass: '',
  icon: undefined,
  iconPosition: 'right',
  error: undefined,
})

const inputModel = defineModel<string>({
  default: '',
  required: false,
})

defineOptions({ inheritAttrs: false })

const emit = defineEmits<{
  (e: 'icon-click', ev: MouseEvent): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const {
  name: nameProp,
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
  error,
} = toRefs(props)

const {
  value: fieldValue,
  errorMessage: validationError,
  handleBlur: veeValidateHandleBlur,
} = useField(nameProp, undefined, {
  initialValue: inputModel.value,
})

const inputId = computed(() => id.value || nameProp.value)
const hasIcon = computed(() => !!icon.value)
const errorMessage = computed(() => error.value || validationError.value)

const baseInputClasses =
  'w-full text-sm leading-5 tracking-wide text-[#2C2C2C] rounded-sm border focus:outline-none py-3.5'

const stateClasses = computed(() => {
  if (errorMessage.value) {
    return 'border-red-400 focus:border-red-400'
  }
  return 'border-[#2C2C2C1A] focus:border-[#F3743D]'
})

const paddingClasses = computed(() => {
  if (hasIcon.value) {
    return iconPosition.value === 'left' ? 'pl-10 pr-4.5' : 'pr-10 pl-4.5'
  }
  return 'px-4.5'
})

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  veeValidateHandleBlur(event)
  emit('blur', event)
}
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="inputId" class="mb-1 text-xs text-gray-700 font-normal tracking-wide">
      {{ label }}<span v-if="required" class="ml-1 text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <input
        :id="inputId"
        :name="nameProp"
        v-model="fieldValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? `${inputId}-error` : undefined"
        :class="[baseInputClasses, stateClasses, paddingClasses, extraClass]"
        @focus="onFocus"
        @blur="onBlur"
        v-bind="$attrs"
      />

      
    </div>

    <p v-if="errorMessage" :id="`${inputId}-error`" class="mt-1 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template> -->

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
