<script setup lang="ts">
import { LocationList } from '@/features/location-list'
import { ButtonVariants } from '@/shared/types'
import { Button, Input, Textarea } from '@/shared/ui'
import { ref } from 'vue'

const username = ref('')
const feedback = ref('')
</script>

<template>
  <div class="flex flex-col max-w-lg">
    <Input v-model="username" label="Локація" placeholder="Золоті Ворота" class="mb-4" />
    <Textarea v-model="feedback" label="Опис" class="mb-4" />
    <LocationList />
    <Button :variant="ButtonVariants.Gradient" class="font-bold">Додати маркер</Button>
  </div>
</template>

<style scoped></style>
