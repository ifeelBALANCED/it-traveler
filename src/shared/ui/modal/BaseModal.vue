<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  isOpen?: boolean
  title?: string
  showFooter?: boolean
  cancelText?: string
  confirmText?: string
  closeOnBackdrop?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'update:isOpen', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: '',
  showFooter: true,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  closeOnBackdrop: true,
})

const emit = defineEmits<Emits>()

const dialogRef = ref<HTMLDialogElement>()

const openModal = () => {
  if (dialogRef.value && !dialogRef.value.open) {
    dialogRef.value.showModal()
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  if (dialogRef.value && dialogRef.value.open) {
    dialogRef.value.close()
    document.body.style.overflow = ''
    emit('close')
    emit('update:isOpen', false)
  }
}

const confirmAction = () => {
  emit('confirm')
  closeModal()
}

const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === dialogRef.value) {
    closeModal()
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      openModal()
    } else {
      closeModal()
    }
  },
)

onMounted(() => {
  if (props.isOpen) {
    openModal()
  }
})

defineExpose({
  openModal,
  closeModal,
})
</script>

<template>
  <dialog
    ref="dialogRef"
    :class="[
      'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
      'bg-white rounded-lg shadow-xl border-0 p-0 max-w-md w-full',
      'open:animate-in open:fade-in-0 open:zoom-in-95',
      'close:animate-out close:fade-out-0 close:zoom-out-95',
    ]"
    @click="handleBackdropClick"
    @keydown.esc="closeModal"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 v-if="title" class="text-lg font-semibold text-gray-900">
          {{ title }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 rounded-lg p-1"
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <slot>
          <p class="text-gray-600">Modal content goes here...</p>
        </slot>
      </div>

      <!-- Footer -->
      <div v-if="showFooter" class="flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="confirmAction"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

dialog[open] {
  animation: modal-appear 0.2s ease-out;
}

dialog::backdrop {
  animation: backdrop-appear 0.2s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes backdrop-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
