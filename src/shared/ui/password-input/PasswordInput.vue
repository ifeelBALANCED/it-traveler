<script setup lang="ts">
import { toRef, ref, computed, type PropType } from 'vue'
import type { Component } from 'vue'
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
  icon: {
    required: false,
    type: Object as PropType<Component>,
    default: undefined,
  },
  iconPosition: {
    required: false,
    type: String,
    default: 'right',
  },
  iconComponentProps: {
    required: false,
    type: Object as PropType<Record<string, unknown>>,
    default: undefined,
  },
})

const name = toRef(props, 'name')
const show = ref(false)
const iconPosition = toRef(props, 'iconPosition')

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
const hasIcon = computed(() => !!props.icon)
const toggleEye = () => (show.value = !show.value)
</script>

<template>
  <div class="flex flex-col w-full">
    <label v-if="label" :for="name" class="mb-1 text-xs text-gray-700 font-normal tracking-wide">
      {{ label }}<span v-if="required" class="ml-1 text-red-500">*</span>
    </label>
    <div class="relative w-full">
      <input
        :name="name"
        :id="name"
        :type="inputType"
        :value="inputValue"
        :placeholder="placeholder"
        :icon="Icon"
        icon-position="right"
        :icon-component-props="{
          name: eyeIcon,
          class: 'h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer',
        }"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? `${name}-error` : undefined"
        @input="handleChange"
        @blur="handleBlur"
        :data-invalid="!!errorMessage"
        :data-icon-position="iconPosition"
      />

      <button
        v-if="hasIcon"
        type="button"
        class="absolute inset-y-0 flex items-center"
        :class="{
          'left-0 pl-3': iconPosition === 'left',
          'right-0 pr-3': iconPosition === 'right',
        }"
        @click.stop="toggleEye"
      >
        <component :is="eyeIcon" v-bind="iconComponentProps" />
      </button>
    </div>

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

  &[data-icon-position='left'] {
    padding-left: 2.5rem;
  }
  &[data-icon-position='right'] {
    padding-right: 2.5rem;
  }

  &[data-invalid='false'] {
    border-color: rgba(44, 44, 44, 0.1);

    &:focus {
      border-color: #f3743d;
    }
  }
}
</style>
