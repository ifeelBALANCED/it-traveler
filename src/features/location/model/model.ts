import { elysiaClient } from '@/shared/api'
import type { GetApiMarkersMyMarkers200OneDataItem as Location } from '@/shared/api/client'
import { useAsyncState } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useModal } from '@/shared/lib/composables'
import { toast } from 'vue-sonner'

export const useLocations = defineStore('locations', () => {
  const locationEditId = ref<Location['id'] | null>(null)
  const addLocationCoords = ref<{ lat: number; lng: number } | null>(null)
  const addLocationModal = useModal()
  const editLocationModal = useModal()

  const {
    state: locations,
    isLoading,
    error,
    execute: refetch,
  } = useAsyncState(async () => {
    const { data: locations } = await elysiaClient.getApiMarkersMyMarkers()
    return locations
  }, [])

  async function removeLocation(id: Location['id']) {
    await elysiaClient.deleteApiMarkersById(id).then(() => {
      toast.success('Маркер успішно видалено')
      refetch()
    })
  }

  function setLocationEditId(id: Location['id']) {
    locationEditId.value = id
  }

  function resetLocationEditId() {
    locationEditId.value = null
  }

  function setAddLocationCoords(coords: { lat: number; lng: number }) {
    addLocationCoords.value = coords
  }

  function resetAddLocationCoords() {
    addLocationCoords.value = null
  }

  const markers = computed(() => {
    return locations.value.map(({ id, latitude, longitude, title }) => ({
      id,
      latitude,
      longitude,
      title,
    }))
  })

  return {
    locations,
    isLoading,
    error,
    removeLocation,
    refetch,
    locationEditId,
    setLocationEditId,
    addLocationModal,
    editLocationModal,
    resetLocationEditId,
    markers,
    addLocationCoords,
    setAddLocationCoords,
    resetAddLocationCoords,
  }
})
