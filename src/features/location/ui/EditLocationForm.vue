<script setup lang="ts">
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useEditLocationForm } from '../model'
import { useLocations } from '../model'
import { storeToRefs } from 'pinia'
import { onUnmounted, watch } from 'vue'
import { elysiaClient } from '@/shared/api'

const locationsStore = useLocations()
const { editLocationModal, resetLocationEditId } = locationsStore
const { locationEditId } = storeToRefs(locationsStore)
const { onLocationEdit, isLoading, form } = useEditLocationForm()

async function prefillEditForm() {
  if (locationEditId.value) {
    const { data: location } = await elysiaClient.getApiMarkersById(locationEditId.value)
    form.setValues({
      ...location,
      description: location.description ?? '',
      address: location.address ?? '',
      imageUrl: location.imageUrl ?? '',
    })
  }
}

watch(
  () => editLocationModal.isOpen,
  (isOpen) => {
    if (isOpen) {
      prefillEditForm()
    }
  },
)

onUnmounted(() => {
  resetLocationEditId()
})
</script>

<template>
  <form class="flex flex-col space-y-5 w-full h-full" @submit.prevent="onLocationEdit">
    <Input name="title" label="Назва" placeholder="Назва" type="text" required />
    <Input name="description" label="Опис" placeholder="Опис" type="text" />
    <Input name="latitude" label="Широта" placeholder="Широта" type="number" required />
    <Input name="longitude" label="Довгота" placeholder="Довгота" type="number" required />
    <Input name="address" label="Адреса" placeholder="Адреса" type="text" />
    <Input name="imageUrl" label="URL зображення" placeholder="URL зображення" type="text" />

    <Button
      type="submit"
      class="mt-auto font-bold"
      :variant="ButtonVariants.Gradient"
      :disabled="isLoading"
      :loading="isLoading"
    >
      Зберегти
    </Button>
  </form>
</template>
