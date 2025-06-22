<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  width?: string | number
  height?: string | number
  color?: string
  class?: string
}>()

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg
    :class="['inline-block flex-shrink-0', props.class]"
    :width="props.width ?? '1em'"
    :height="props.height ?? '1em'"
    :fill="props.color ?? 'currentColor'"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>
