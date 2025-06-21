<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useEditLocationForm, useLocations } from '../model'
import { elysiaClient } from '@/shared/api'
import type { GetApiMarkersMyMarkers200OneDataItem as Location } from '@/shared/api/client'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const locationsStore = useLocations()
const {
  editLocationModal,
  resetLocationEditId,
  resetEditLocationCoords,
  clearTemporaryMarkerPosition,
} = locationsStore
const { locationEditId, editLocationCoords, locations } = storeToRefs(locationsStore)

const { form, onSubmit, isLoading: isSubmitting, handleReset } = useEditLocationForm()

function prepareFormData(locationData: Location) {
  const formData = {
    ...locationData,
    description: locationData.description ?? '',
    address: locationData.address ?? '',
    imageUrl: locationData.imageUrl ?? '',
  }

  if (editLocationCoords.value) {
    formData.latitude = editLocationCoords.value.lat
    formData.longitude = editLocationCoords.value.lng
  }

  return formData
}

async function getLocationData(id: string): Promise<Location> {
  const localLocation = locations.value.find((location) => location.id === id)
  if (localLocation) {
    return localLocation
  }

  const { data } = await elysiaClient.getApiMarkersById(id)
  return data
}

async function prefillForm() {
  handleReset()

  const id = locationEditId.value
  if (!id) return

  try {
    const locationData = await getLocationData(id)
    const formData = prepareFormData(locationData)
    form.setValues(formData)
  } catch (error) {
    console.error('Failed to load location data:', error)
  }
}

function resetFormState() {
  const markerId = locationEditId.value

  if (markerId) {
    clearTemporaryMarkerPosition(markerId)
  }

  handleReset()
  resetLocationEditId()
  resetEditLocationCoords()
}

watch(
  () => editLocationModal.isOpen,
  (isOpen) => {
    if (isOpen) {
      prefillForm()
    } else {
      resetFormState()
    }
  },
  { immediate: true },
)
</script>

<template>
  <form class="flex flex-col space-y-5 w-full h-full" @submit.prevent="onSubmit">
    <Input name="title" label="Назва" placeholder="Назва" type="text" required />

    <Input name="description" label="Опис" placeholder="Опис" type="text" />

    <div class="flex space-x-4">
      <Input name="latitude" label="Широта" placeholder="Широта" type="number" required />
      <Input name="longitude" label="Довгота" placeholder="Довгота" type="number" required />
    </div>

    <Input name="address" label="Адреса" placeholder="Адреса" type="text" />

    <Input name="imageUrl" label="URL зображення" placeholder="URL зображення" type="text" />

    <Button
      type="submit"
      class="mt-auto font-bold"
      :variant="ButtonVariants.Gradient"
      :loading="isSubmitting"
    >
      Зберегти
    </Button>
  </form>
</template>
