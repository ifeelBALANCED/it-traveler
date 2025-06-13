<script setup lang="ts">
import { toRef } from 'vue'
import type { GetApiMarkersMyMarkers200OneDataItem as Location } from '@/shared/api/client'
import { Icon } from '@/shared/ui/icon'

const props = defineProps<{ location: Location }>()
const emit = defineEmits<{
  (e: 'edit', id: Location['id']): void
  (e: 'delete', id: Location['id']): void
}>()
const location = toRef(props, 'location')
</script>

<template>
  <div
    class="group relative flex items-start gap-4 p-4 pl-5 bg-white rounded-lg border border-transparent shadow transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white w-full"
  >
    <span
      class="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />

    <div class="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
      <img
        v-if="location.imageUrl"
        :src="location.imageUrl"
        :alt="location.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
        <Icon
          name="map-marker-icon"
          class="w-6 h-6 text-gray-400 transition-colors duration-200 group-hover:text-blue-500"
          aria-hidden="true"
        />
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <h3
          class="text-base font-semibold text-gray-900 truncate transition-colors duration-200 group-hover:text-blue-800"
        >
          {{ location.title }}
        </h3>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            @click="emit('edit', location.id)"
            class="p-1 cursor-pointer rounded-md bg-white shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
          >
            <Icon name="edit-action" class="w-4 h-4 text-blue-500" />
          </button>
          <button
            type="button"
            @click="emit('delete', location.id)"
            class="p-1 cursor-pointer rounded-md bg-white shadow hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-200"
          >
            <Icon name="delete-action" class="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      <p
        class="mt-2 text-sm text-gray-600 line-clamp-2 break-words transition-colors duration-200 group-hover:text-gray-800"
      >
        {{ location.description || 'Немає опису' }}
      </p>
    </div>
  </div>
</template>
