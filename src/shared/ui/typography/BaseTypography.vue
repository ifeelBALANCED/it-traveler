<script setup lang="ts">
import { computed } from 'vue'

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

const props = defineProps<
  Partial<{
    as: keyof HTMLElementTagNameMap
    variant: Variant
    class: string
  }>
>()

const tag = computed(() => props.as || getDefaultTag(props.variant))
const variantClass = computed(() => (props.variant ? `text-${props.variant}` : ''))

function getDefaultTag(variant?: Variant) {
  if (!variant) return 'span'
  if (variant.startsWith('h')) return variant
  if (variant === 'button') return 'button'
  return 'p'
}
</script>

<template>
  <component :is="tag" :class="[variantClass, props.class]">
    <slot />
  </component>
</template>
