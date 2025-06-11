<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useEditLocationForm } from '../model'
import { useLocations } from '../model'
import { elysiaClient } from '@/shared/api'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const locationsStore = useLocations()
const { editLocationModal, resetLocationEditId } = locationsStore
const { locationEditId } = storeToRefs(locationsStore)

const { form, onSubmit, isLoading: isSubmitting, handleReset } = useEditLocationForm()

async function prefillForm() {
  handleReset()

  const id = locationEditId.value
  if (!id) return

  try {
    const { data } = await elysiaClient.getApiMarkersById(id)
    form.setValues({
      ...data,
      description: data.description ?? '',
      address: data.address ?? '',
      imageUrl: data.imageUrl ?? '',
    })
  } catch (err) {
    console.error(err)
  }
}

function resetFormState() {
  handleReset()
  resetLocationEditId()
}

watch(
  () => editLocationModal.isOpen,
  (open) => {
    if (open) prefillForm()
    else resetFormState()
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
