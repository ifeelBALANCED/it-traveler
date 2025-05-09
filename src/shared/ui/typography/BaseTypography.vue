<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle-1'
  | 'subtitle-2'
  | 'body-1'
  | 'body-2'
  | 'button'
  | 'caption'
  | 'overline'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
      'subtitle-1': 'text-subtitle-1',
      'subtitle-2': 'text-subtitle-2',
      'body-1': 'text-body-1',
      'body-2': 'text-body-2',
      button: 'text-button',
      caption: 'text-caption',
      overline: 'text-overline',
    },
  },
  defaultVariants: {
    variant: 'body-1',
  },
})

const props = withDefaults(
  defineProps<{
    variant?: Variant
    as?: keyof HTMLElementTagNameMap
    class?: string
  }>(),
  {
    variant: 'body-1',
    as: undefined,
    class: '',
  },
)

const tag = computed(() => props.as || getDefaultTag(props.variant))

const classes = computed(() => {
  return [typographyVariants({ variant: props.variant }), props.class]
})

function getDefaultTag(variant?: Variant) {
  if (!variant) return 'span'
  if (variant.startsWith('h')) return variant
  if (variant === 'button') return 'button'
  return 'p'
}
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
