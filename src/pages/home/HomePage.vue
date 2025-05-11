<script setup lang="ts">
import { LocationList } from '@/features/location-list'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { ref } from 'vue'

const username = ref('')
const feedback = ref('')
</script>

<template>
  <div class="flex flex-col max-w-lg">
    <Input v-model="username" label="Локація" placeholder="Золоті Ворота" class="mb-4" />
    <Textarea v-model="feedback" label="Опис" class="mb-4" />
    <location-list />
    <Button :variant="ButtonVariants.Gradient" class="font-bold">Додати маркер</Button>
  </div>
</template>

<style scoped></style>
