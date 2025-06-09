<script setup lang="ts">
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
</script>

<template>
  <form class="flex flex-col space-y-5 w-full h-full">
    <Input name="title" label="Назва" placeholder="Назва" type="text" required />
    <Input name="description" label="Опис" placeholder="Опис" type="text" />
    <Input name="latitude" label="Широта" placeholder="Широта" type="number" required />
    <Input name="longitude" label="Довгота" placeholder="Довгота" type="number" required />
    <Input name="address" label="Адреса" placeholder="Адреса" type="text" />
    <Input name="imageUrl" label="URL зображення" placeholder="URL зображення" type="text" />

    <Button type="submit" class="mt-auto font-bold" :variant="ButtonVariants.Gradient">
      Додати
    </Button>
  </form>
</template>
