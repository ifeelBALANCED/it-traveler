<script setup lang="ts">
import { useLocations } from '@/features/location'
import { storeToRefs } from 'pinia'
import { Typography } from '@/shared/ui/typography'
import { default as LocationCard } from './LocationCard.vue'
import { default as LocationLoader } from './LocationLoader.vue'
import { default as AddLocationModal } from './AddLocationModal.vue'
import { default as EditLocationModal } from './EditLocationModal.vue'

const locationStore = useLocations()
const { locations, isLoading, error } = storeToRefs(locationStore)
</script>

<template>
  <section class="flex-1 overflow-y-auto px-4 py-2 space-y-3">
    <template v-if="isLoading">
      <location-loader />
    </template>
    <template v-else-if="error">
      <typography variant="body-2" class="text-red-500 text-center">
        {{ error }}
      </typography>
    </template>

    <template v-else-if="locations.length === 0">
      <typography variant="body-2" class="text-gray-500 text-center">
        Немає маркерів.
        <button class="text-action underline ml-1" @click="locationStore.addLocation">
          Додайте перший
        </button>
      </typography>
    </template>

    <template v-else>
      <div
        v-for="location in locations"
        :key="location.id"
        class="group flex items-start p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <location-card
          :location="location"
          @delete="locationStore.removeLocation"
          @edit="locationStore.editLocation"
        />
      </div>
    </template>
  </section>
  <add-location-modal />
  <edit-location-modal />
</template>

<style scoped></style>
