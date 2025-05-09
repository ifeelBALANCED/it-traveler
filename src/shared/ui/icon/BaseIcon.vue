<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  prefix?: string
  width?: string | number
  height?: string | number
  color?: string
  class?: string
}>()

const symbolId = computed(() => `#${props.prefix ?? 'icon'}-${props.name}`)
</script>

<template>
  <svg
    aria-hidden="true"
    :class="['inline-block flex-shrink-0', props.class]"
    :width="props.width ?? '1em'"
    :height="props.height ?? '1em'"
    :fill="props.color ?? 'currentColor'"
  >
    <use :href="symbolId" />
  </svg>
</template>
