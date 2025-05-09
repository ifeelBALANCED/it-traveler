<script setup lang="ts">
import { Icon, Typography } from '@/shared/ui'
const { location } = defineProps<{
  location: {
    id: number
    name: string
    description: string
    image: string
  }
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

const handleEdit = () => emit('edit', location.id)
const handleDelete = () => emit('delete', location.id)
</script>

<template>
  <div class="flex gap-x-3.5 pb-3.5">
    <img
      :src="location.image"
      alt="location image"
      class="w-[76px] h-[76px] object-cover rounded"
    />

    <div class="flex flex-col flex-1 gap-y-2">
      <div class="flex justify-between w-full">
        <Typography variant="subtitle-2" class="text-[#2C2C2C]">{{ location.name }}</Typography>
        <div class="flex justify-center gap-2">
          <button
            @click="handleEdit"
            title="Edit"
            class="flex items-center justify-center h-6 w-6 hover:bg-gray-100 rounded-full action-edit"
          >
            <Icon name="edit-action" />
          </button>
          <button
            @click="handleDelete"
            title="Delete"
            class="flex items-center justify-center h-6 w-6 hover:bg-gray-100 rounded-full action-delete"
          >
            <Icon name="delete-action" />
          </button>
        </div>
      </div>
      <div class="flex flex-1">
        <Typography variant="caption" class="text-[#2C2C2C]/50 line-clamp-3">{{
          location.description
        }}</Typography>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
