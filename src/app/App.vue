<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts/DefaultLayout'

const route = useRoute()

const layout = computed(() => route.meta.layout ?? DefaultLayout)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
