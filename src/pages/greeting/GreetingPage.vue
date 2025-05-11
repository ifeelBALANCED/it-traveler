<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { RouterLink } from 'vue-router'
import { ButtonVariants, ROUTES } from '@/shared/types'
</script>

<template>
  <div
    class="grid h-full w-full grid-rows-[1fr_auto] place-items-center p-4 sm:p-8 md:p-16 text-white text-center"
  >
    <div class="grid place-items-center w-full max-w-lg mx-auto">
      <div class="grid gap-6 justify-items-center">
        <Icon name="map-pin" class="mb-1" width="6.25em" height="6.25em" color="white" />
        <h1 class="text-3xl sm:text-4xl font-bold">IT traveler</h1>
        <p class="leading-6 max-w-md">
          Простий і зручний веб додаток, який дозволить тобі відмічати твої улюблені місця, а також
          ті, в яких би ти дуже хотів побувати. Тож не зволікай і спробуй сам.
        </p>
        <Button :as="RouterLink" :to="ROUTES.REGISTER" class="text-base font-bold mt-2">
          Почати роботу
        </Button>
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 text-sm mt-8 sm:mt-0">
      <span>У вас ще немає акаунту?</span>
      <Button :as="RouterLink" :variant="ButtonVariants.Link" :to="ROUTES.REGISTER" class="!p-0">
        Зареєструватися
      </Button>
      <span>або</span>
      <Button :as="RouterLink" :variant="ButtonVariants.Link" :to="ROUTES.LOGIN" class="!p-0">
        увійти
      </Button>
    </div>
  </div>
</template>
