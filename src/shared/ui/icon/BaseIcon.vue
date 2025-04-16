<script setup lang="ts">
import { computed, defineAsyncComponent, type Component, type StyleValue } from 'vue'

interface IconProps {
  name: string
  iconClass?: string
  fill?: string
  width?: number | string
  height?: number | string
  animation?: string
  animationDuration?: string
}

type SvgModule = { default: Component }

const icons = import.meta.glob<SvgModule>('/src/app/icons/*.svg', {
  eager: false,
  import: 'default',
})

const props = withDefaults(defineProps<IconProps>(), {
  iconClass: '',
  fill: 'none',
  width: '1em',
  height: '1em',
  animation: undefined,
  animationDuration: '300ms',
})

const iconPath = computed(() => {
  return `/src/app/icons/${props.name}.svg`
})

const iconComponent = computed(() => {
  const loader = icons[iconPath.value]
  if (!loader) {
    console.warn(`Icon "${props.name}" not found at path: ${iconPath.value}`)
    return null
  }

  return defineAsyncComponent({
    loader,
    loadingComponent: {
      template: '<span class="icon-loading bg-current opacity-20 animate-pulse"></span>',
    },
    errorComponent: {
      template: '<span class="icon-error">⚠️</span>',
    },
    delay: 200,
    timeout: 3000,
  })
})

const iconStyle = computed<StyleValue>(() => ({
  fill: props.fill,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  animation: props.animation ? `${props.animation} ${props.animationDuration}` : undefined,
}))
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="['inline-block flex-shrink-0 transition-all duration-200 ease-in-out', iconClass]"
    :style="iconStyle"
    aria-hidden="true"
    focusable="false"
    role="img"
  />
  <span
    v-else
    :class="['inline-flex items-center justify-center border border-dashed', iconClass]"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      color: fill,
    }"
  >
    □
  </span>
</template>
