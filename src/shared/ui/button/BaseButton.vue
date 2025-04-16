<script setup lang="ts">
import { computed, type Component } from 'vue'
import { type ButtonVariant, ButtonVariants } from '@/shared/types'
import LoaderIcon from '@/app/icons/loader.svg'

interface ButtonProps {
  as?: keyof HTMLElementTagNameMap | Component
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  icon?: Component
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  variant: ButtonVariants.Primary,
  disabled: false,
  loading: false,
  fullWidth: false,
  size: 'md',
  icon: undefined,
  iconPosition: 'left',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const BASE_CLASSES = [
  'font-medium',
  'transition-all duration-200 ease-in-out',
  'inline-flex items-center justify-center',
  'border border-transparent',
  'whitespace-nowrap',
  'disabled:opacity-50 disabled:cursor-not-allowed',
]

const SIZE_CLASSES = {
  sm: 'text-sm py-2 px-3 rounded-lg',
  md: 'text-base py-2.5 px-5 rounded-xl',
  lg: 'text-lg py-3.5 px-8 rounded-xl',
} as const

const VARIANT_CLASSES = {
  [ButtonVariants.Primary]: [
    'button-primary',
    'text-white',
    'hover:button-primary',
    'rounded-xl py-3.5 px-10',
  ],
  [ButtonVariants.Link]: 'inline-block underline',
} as const

const buttonClasses = computed(() => [
  ...BASE_CLASSES,
  SIZE_CLASSES[props.size],
  VARIANT_CLASSES[props.variant],
  {
    'w-full': props.fullWidth,
    'pointer-events-none opacity-75': props.loading,
  },
])

const iconClasses = computed(() => ({
  'mr-2': props.iconPosition === 'left',
  'ml-2': props.iconPosition === 'right',
  'animate-spin': props.loading,
}))

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="props.as"
    :class="buttonClasses"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :aria-disabled="props.disabled || props.loading"
    @click="handleClick"
  >
    <template v-if="props.loading">
      <img :src="LoaderIcon" alt="Loading" class="w-5 h-5 animate-spin" aria-hidden="true" />
    </template>

    <template v-else>
      <component v-if="props.icon" :is="props.icon" :class="iconClasses" aria-hidden="true" />
      <slot />
    </template>
  </component>
</template>
