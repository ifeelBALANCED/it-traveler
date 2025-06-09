<script setup lang="ts">
import { toRef } from 'vue'
import type { GetApiMarkersMyMarkers200OneDataItem as Location } from '@/shared/api/client'

const props = defineProps<{
  location: Location
}>()

const location = toRef(props, 'location')

const emit = defineEmits<{
  (e: 'edit', id: Location['id']): void
  (e: 'delete', id: Location['id']): void
}>()
</script>

<template>
  <img
    v-if="location.imageUrl"
    :src="location.imageUrl ?? ''"
    :alt="location.title"
    class="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0"
  />
  <div class="flex-1 min-w-0">
    <div class="flex items-start justify-between mb-1">
      <h3 class="font-medium text-gray-900 text-sm leading-tight">
        {{ location.title }}
      </h3>
      <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button class="p-1 hover:text-orange-500 text-gray-400">
          <!-- edit icon -->
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                           m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button class="p-1 hover:text-red-500 text-gray-400" @click="emit('delete', location.id)">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                          a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                          m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">
      {{ location.description }}
    </p>
  </div>
</template>
