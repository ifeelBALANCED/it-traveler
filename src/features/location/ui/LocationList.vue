<script setup lang="ts">
import { useLocations } from '@/features/location'
import { storeToRefs } from 'pinia'
import { Typography } from '@/shared/ui/typography'
import { default as LocationCard } from './LocationCard.vue'
import { default as LocationLoader } from './LocationLoader.vue'

const locationStore = useLocations()
const { removeLocation, setLocationEditId, addLocationModal, editLocationModal } = locationStore
const { locations, isLoading, error } = storeToRefs(locationStore)

const onLocationEdit = (id: string) => {
  setLocationEditId(id)
  editLocationModal.open()
}
</script>

<template>
  <section class="flex-1 overflow-y-auto py-1 space-y-3">
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
        <button class="text-action underline ml-1" @click="addLocationModal.open">
          Додайте перший
        </button>
      </typography>
    </template>

    <template v-else>
      <div v-for="location in locations" :key="location.id">
        <location-card
          :location="location"
          @delete="removeLocation(location.id)"
          @edit="onLocationEdit(location.id)"
        />
      </div>
    </template>
  </section>
</template>

<style scoped></style>
