<script setup lang="ts">
import { type Component, toRefs } from 'vue'
import { cva } from 'class-variance-authority'
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
  class?: string
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

const { as: Tag, disabled, loading, size, variant, fullWidth, icon, iconPosition } = toRefs(props)

const buttonStyles = cva(
  'relative inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        [ButtonVariants.Primary]: 'button-primary hover:button-primary',
        [ButtonVariants.Link]: 'inline-block underline',
        [ButtonVariants.Gradient]: 'button-gradient hover:none',
      },
      size: {
        sm: 'text-sm py-2 px-3 rounded-lg',
        md: 'text-base py-2.5 px-5 rounded-xl',
        lg: 'text-lg py-3.5 px-8 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-75',
        false: '',
      },
      iconPosition: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      },
    },
    compoundVariants: [
      {
        variant: ButtonVariants.Primary,
        size: 'lg',
        class: 'rounded-xl py-3.5 px-10',
      },
      {
        variant: ButtonVariants.Gradient,
        size: 'lg',
        class: 'rounded-xl py-3.5 px-10',
      },
    ],
    defaultVariants: {
      variant: ButtonVariants.Primary,
      size: 'md',
      fullWidth: false,
      disabled: false,
      iconPosition: 'left',
    },
  },
)

const handleClick = (event: MouseEvent) => {
  if (disabled.value || loading.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="Tag"
    :class="[
      buttonStyles({
        variant,
        size,
        fullWidth,
        disabled: disabled || loading,
        iconPosition,
      }),
      props.class,
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">
      <img :src="LoaderIcon" alt="Loading" class="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
    </template>
    <template v-else-if="icon && iconPosition === 'left'">
      <component :is="icon" class="mr-2" aria-hidden="true" />
      <slot />
    </template>
    <template v-else-if="icon && iconPosition === 'right'">
      <slot />
      <component :is="icon" class="ml-2" aria-hidden="true" />
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>
