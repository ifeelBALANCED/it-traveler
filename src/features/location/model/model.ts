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
  const editLocationCoords = ref<{ lat: number; lng: number } | null>(null)
  const originalLocationCoords = ref<{ lat: number; lng: number } | null>(null)
  const temporaryMarkerPositions = ref<Record<string, { lat: number; lng: number }>>({})
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

  function setEditLocationCoords(coords: { lat: number; lng: number }) {
    editLocationCoords.value = coords
  }

  function resetEditLocationCoords() {
    editLocationCoords.value = null
  }

  function setOriginalLocationCoords(coords: { lat: number; lng: number }) {
    originalLocationCoords.value = coords
  }

  function resetOriginalLocationCoords() {
    originalLocationCoords.value = null
  }

  function setTemporaryMarkerPosition(markerId: string, coords: { lat: number; lng: number }) {
    temporaryMarkerPositions.value[markerId] = coords
  }

  function clearTemporaryMarkerPosition(markerId: string) {
    delete temporaryMarkerPositions.value[markerId]
  }

  function resetTemporaryMarkerPositions() {
    temporaryMarkerPositions.value = {}
  }

  const markers = computed(() => {
    return locations.value.map(({ id, latitude, longitude, title }) => {
      const tempPosition = temporaryMarkerPositions.value[id]
      return {
        id,
        latitude: tempPosition?.lat ?? latitude,
        longitude: tempPosition?.lng ?? longitude,
        title,
      }
    })
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
    editLocationCoords,
    setEditLocationCoords,
    resetEditLocationCoords,
    originalLocationCoords,
    setOriginalLocationCoords,
    resetOriginalLocationCoords,
    setTemporaryMarkerPosition,
    clearTemporaryMarkerPosition,
    resetTemporaryMarkerPositions,
  }
})
