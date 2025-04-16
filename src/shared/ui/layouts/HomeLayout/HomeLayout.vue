<script setup lang="ts">
import StaticMap from '@/app/icons/static-map.svg'
</script>

<template>
  <main class="h-screen flex flex-col md:flex-row">
    <section class="flex-1 bg-primary p-5 grid place-items-center">
      <div class="text-white w-full h-full">
        <slot />
      </div>
    </section>

    <section class="flex-1">
      <StaticMap class="w-full h-full object-cover" alt="static map" />
    </section>
  </main>
</template>
