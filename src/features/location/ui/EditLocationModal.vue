<script setup lang="ts">
import { default as EditLocationForm } from './EditLocationForm.vue'
import { useLocations } from '../model'
import { Modal } from '@/shared/ui/modal'

const locationsStore = useLocations()
const { editLocationModal } = locationsStore
</script>

<template>
  <Modal
    title="Редагувати місце"
    :is-open="editLocationModal.isOpen"
    :show-footer="false"
    @close="editLocationModal.close"
  >
    <EditLocationForm />
  </Modal>
</template>
