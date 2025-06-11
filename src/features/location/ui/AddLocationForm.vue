<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAddLocationForm } from '../model'
import { useLocations } from '../model'

import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const locationsStore = useLocations()
const { addLocationModal } = locationsStore
const { addLocationCoords } = storeToRefs(locationsStore)
const { resetAddLocationCoords } = locationsStore

const { form, onSubmit, isLoading, handleReset } = useAddLocationForm()

const isBusy = computed(() => isLoading.value)

function resetFormState() {
  handleReset()
  resetAddLocationCoords()
}

watch(
  () => addLocationModal.isOpen,
  (open) => {
    if (open && addLocationCoords.value) {
      form.setFieldValue('latitude', addLocationCoords.value.lat)
      form.setFieldValue('longitude', addLocationCoords.value.lng)
    } else {
      resetFormState()
    }
  },
  { immediate: true },
)
</script>

<template>
  <form class="flex flex-col space-y-5 w-full h-full" @submit.prevent="onSubmit">
    <Input name="title" label="Назва" placeholder="Назва" type="text" required :disabled="isBusy" />

    <Input name="description" label="Опис" placeholder="Опис" type="text" :disabled="isBusy" />

    <div class="flex space-x-4">
      <Input
        name="latitude"
        label="Широта"
        placeholder="Широта"
        type="number"
        required
        :disabled="isBusy"
      />
      <Input
        name="longitude"
        label="Довгота"
        placeholder="Довгота"
        type="number"
        required
        :disabled="isBusy"
      />
    </div>

    <Input name="address" label="Адреса" placeholder="Адреса" type="text" :disabled="isBusy" />

    <Input
      name="imageUrl"
      label="URL зображення"
      placeholder="URL зображення"
      type="text"
      required
      :disabled="isBusy"
    />

    <Button
      type="submit"
      class="mt-auto font-bold"
      :variant="ButtonVariants.Gradient"
      :loading="isLoading"
      :disabled="isBusy"
    >
      Додати
    </Button>
  </form>
</template>
