import { elysiaClient } from '@/shared/api'
import type { GetApiMarkersMyMarkers200OneDataItem as Location } from '@/shared/api/client'
import { useAsyncState } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useModal } from '@/shared/lib/composables'
import { useAddLocationForm, useEditLocationForm } from './form'

export const useLocations = defineStore('locations', () => {
  const addLocationModal = useModal()
  const editLocationModal = useModal()
  const addLocationForm = useAddLocationForm()
  const editLocationForm = useEditLocationForm()

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
    await Promise.all([elysiaClient.deleteApiMarkersById(id), refetch()])
  }

  async function editLocation(id: Location['id']) {
    editLocationModal.open()
    return editLocationForm.handleSubmit(async (values) => {
      const { data: location } = await elysiaClient.getApiMarkersById(id)
      const { success } = await elysiaClient.putApiMarkersById(id, values)
      const { title, description, latitude, longitude, address, imageUrl } = location
      editLocationForm.setValues({
        title,
        description: description ?? '',
        latitude,
        longitude,
        address: address ?? '',
        imageUrl: imageUrl ?? '',
      })

      if (success) {
        await refetch()
        editLocationModal.close()
      }
    })
  }

  async function addLocation() {
    addLocationModal.open()

    return addLocationForm.handleSubmit(async (values) => {
      const { success } = await elysiaClient.postApiMarkers(values)
      if (success) {
        await refetch()
        addLocationModal.close()
      }
    })
  }

  return {
    locations,
    isLoading,
    error,
    removeLocation,
    addLocationModal,
    editLocationModal,
    editLocation,
    addLocation,
  }
})
