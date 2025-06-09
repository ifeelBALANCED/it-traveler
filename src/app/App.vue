<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts/DefaultLayout'
import { Toaster } from 'vue-sonner'

const route = useRoute()

const layout = computed(() => route.meta.layout ?? DefaultLayout)
</script>

<template>
  <Toaster richColors :duration="2000" />
  <component :is="layout">
    <router-view />
  </component>
</template>
