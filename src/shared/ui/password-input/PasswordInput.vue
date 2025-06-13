<script setup lang="ts">
import { toRefs, ref, computed } from 'vue'
import { useField } from 'vee-validate'
import { Icon } from '@/shared/ui/icon'

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
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
  iconPosition: {
    type: String,
    default: 'right',
  },
})

const { name, label, placeholder, required, iconPosition = 'right' } = toRefs(props)
const show = ref(false)

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
})

const inputType = computed(() => (show.value ? 'text' : 'password'))
const eyeIcon = computed(() => (show.value ? 'eye-hidden' : 'eye-visible'))
const toggleEye = () => (show.value = !show.value)
</script>

<template>
  <div
    class="flex flex-col w-full"
    data-testid="PasswordInput-group"
    data-test="PasswordInput.group"
  >
    <label
      v-if="label"
      :for="name"
      class="mb-1 text-xs text-gray-700 font-normal tracking-wide"
      data-testid="PasswordInput-label"
      data-test="PasswordInput.label"
    >
      {{ label }}<span v-if="required" class="ml-1 text-red-500" aria-hidden="true">*</span>
    </label>
    <div class="relative w-full">
      <input
        :name="name"
        :id="name"
        :type="inputType"
        :value="inputValue"
        :placeholder="placeholder"
        :aria-required="required ? 'true' : 'false'"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? `${name}-error` : undefined"
        data-testid="PasswordInput-input"
        data-test="PasswordInput.input"
        @input="handleChange"
        @blur="handleBlur"
        :data-invalid="!!errorMessage"
        :data-icon-position="iconPosition"
      />

      <button
        type="button"
        class="absolute inset-y-0 right-2 flex items-center h-[calc(100%-2px)]"
        @click.stop="toggleEye"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show ? 'true' : 'false'"
        data-testid="PasswordInput-toggle"
        data-test="PasswordInput.toggle"
      >
        <Icon :name="eyeIcon" class="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </button>
    </div>

    <p
      v-if="errorMessage"
      :id="`${name}-error`"
      class="mt-1 text-sm text-red-500"
      role="alert"
      data-testid="PasswordInput-error"
      data-test="PasswordInput.error"
    >
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

  &[data-icon-position='left'] {
    padding-left: 2rem;
  }

  &[data-icon-position='right'] {
    padding-right: 2rem;
  }

  &[data-invalid='false'] {
    border-color: rgba(44, 44, 44, 0.1);

    &:focus {
      border-color: #f3743d;
    }
  }
}
</style>
