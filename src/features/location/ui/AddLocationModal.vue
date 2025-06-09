<script setup lang="ts">
import { default as AddLocationForm } from './AddLocationForm.vue'
import { useLocations } from '../model'
import { Modal } from '@/shared/ui/modal'

const locationsStore = useLocations()
const { addLocationModal } = locationsStore
</script>

<template>
  <Modal
    title="Додати місце"
    :is-open="addLocationModal.isOpen"
    :show-footer="false"
    @close="addLocationModal.close"
  >
    <AddLocationForm />
  </Modal>
</template>
