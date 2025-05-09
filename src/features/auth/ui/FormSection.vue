<script setup lang="ts">
import { ROUTES, ButtonVariants } from '@/shared/types'
import { RouterLink } from 'vue-router'
import { Button } from '@/shared/ui'
</script>

<template>
  <section
    class="mx-auto max-w-lg w-full bg-white rounded-lg p-10 flex flex-col items-center max-h-[499px] h-full"
  >
    <nav class="flex space-x-11 mb-8" aria-label="Auth pages">
      <Button
        :as="RouterLink"
        :to="ROUTES.REGISTER"
        :variant="ButtonVariants.Link"
        class="!p-0 text-base !font-bold text-black/20 hover:text-black !no-underline"
        active-class="text-orange-500"
        exact-active-class="text-orange-500"
      >
        Створити акаунт
      </Button>
      <Button
        :as="RouterLink"
        :to="ROUTES.LOGIN"
        :variant="ButtonVariants.Link"
        class="!p-0 text-base !font-bold text-black/20 hover:text-black !no-underline"
        active-class="text-orange-500"
        exact-active-class="text-orange-500"
      >
        Увійти
      </Button>
    </nav>

    <form class="flex flex-col space-y-5 w-full h-full" @submit.prevent="console.log">
      <slot />
    </form>
  </section>
</template>
