<script setup lang="ts">
import { computed, ref } from 'vue'
import { LeafletMap } from '@/widgets/leaflet-map'
import { useSession } from '@/entities/session'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/shared/types'
import { elysiaClient } from '@/shared/api'
import { toast } from 'vue-sonner'
import { LocationList, useLocations } from '@/features/location'
import { storeToRefs } from 'pinia'
import { EditLocationModal, AddLocationModal } from '@/features/location'
import { Icon } from '@/shared/ui/icon'

interface Marker {
  id: string
  latitude: number
  longitude: number
  title?: string
}

const router = useRouter()
const session = useSession()
const locationsStore = useLocations()
const { markers } = storeToRefs(locationsStore)
const {
  addLocationModal,
  setAddLocationCoords,
  editLocationModal,
  setLocationEditId,
  setEditLocationCoords,
  setOriginalLocationCoords,
  setTemporaryMarkerPosition,
} = locationsStore
const { clear: clearSession, user } = session

const sidebarCollapsed = ref(false)
const mapRef = ref()

const userDisplayName = computed(() => {
  return user?.name || user?.email || 'Користувач'
})

async function handleLogout() {
  const { success } = await elysiaClient.postApiAuthLogout()
  if (success) {
    clearSession()
    toast.success('Ви успішно вийшли з системи')
    router.push({ name: ROUTES.LOGIN })
  }
}

function handleMapClick(coords: { lat: number; lng: number }) {
  setAddLocationCoords(coords)
  addLocationModal.open()
}

function handleMarkerDrag(marker: Marker, newCoords: { lat: number; lng: number }) {
  setOriginalLocationCoords({ lat: marker.latitude, lng: marker.longitude })
  setTemporaryMarkerPosition(marker.id, newCoords)
  setLocationEditId(marker.id)
  setEditLocationCoords(newCoords)
  editLocationModal.open()
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

function handleResetView() {
  mapRef.value?.resetView()
}

function handleLocateMe() {
  mapRef.value?.locateMe()
}

function handleToggleAddMode() {
  mapRef.value?.toggleAddMode()
}
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden">
    <main class="w-full h-full">
      <LeafletMap
        ref="mapRef"
        :initial-zoom="13"
        :center="[50.4501, 30.5234]"
        :markers="markers"
        @mapClick="handleMapClick"
        @markerDrag="handleMarkerDrag"
      />
    </main>

    <aside
      :class="[
        'fixed top-0 left-0 z-[9999] h-full transition-all duration-300 ease-in-out flex flex-col bg-white/95 backdrop-blur-md border-r border-gray-300 shadow-2xl',
        sidebarCollapsed ? 'w-16' : 'w-80',
      ]"
    >
      <div class="flex flex-col h-full">
        <div class="p-4 border-b border-gray-100/50">
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1 flex">
              <h1
                v-if="!sidebarCollapsed"
                class="text-xl font-bold text-gradient animate-fade-in text-center"
              >
                IT Traveler
              </h1>
            </div>
            <button @click="toggleSidebar" class="btn-ghost btn-sm p-2 rounded-xl">
              <Icon
                name="chevron-left"
                :class="`w-5 h-5 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`"
              />
            </button>
          </div>

          <div class="flex">
            <div
              :class="[
                'flex items-center transition-all duration-300',
                sidebarCollapsed ? 'justify-center' : 'flex-col items-center space-y-2',
              ]"
            >
              <div v-if="!sidebarCollapsed" class="text-center animate-fade-in">
                <p class="font-semibold text-gray-900 text-sm">{{ userDisplayName }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!sidebarCollapsed" class="p-4 border-b border-gray-100/50">
          <div class="text-center mb-3">
            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Керування картою
            </h2>
          </div>
          <div class="flex justify-center">
            <div class="grid grid-cols-3 gap-2">
              <button
                @click="handleResetView"
                title="Скинути вигляд"
                class="flex flex-col items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group shadow-sm h-16 aspect-square"
              >
                <Icon
                  name="refresh"
                  class="w-4 h-4 mb-1 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                />
                <span class="text-xs font-medium text-center leading-tight">Скинути</span>
              </button>

              <button
                @click="handleLocateMe"
                title="Моє місцезнаходження"
                class="flex flex-col items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group shadow-sm h-16 aspect-square"
              >
                <Icon
                  name="location"
                  class="w-4 h-4 mb-1 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                />
                <span class="text-xs font-medium text-center leading-tight">Локація</span>
              </button>

              <button
                @click="handleToggleAddMode"
                title="Режим додавання"
                class="flex flex-col items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group shadow-sm h-16 aspect-square"
              >
                <Icon
                  name="plus"
                  class="w-4 h-4 mb-1 group-hover:scale-110 transition-transform duration-200 flex-shrink-0 text-white"
                />
                <span class="text-xs font-medium text-center leading-tight text-white">Додати</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="sidebarCollapsed" class="p-2">
          <div class="space-y-2 flex flex-col items-center">
            <button
              @click="handleResetView"
              title="Скинути вигляд"
              class="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group flex items-center justify-center"
            >
              <Icon
                name="refresh"
                class="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              />
            </button>

            <button
              @click="handleLocateMe"
              title="Моє місцезнаходження"
              class="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group flex items-center justify-center"
            >
              <Icon
                name="location"
                class="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              />
            </button>

            <button
              @click="handleToggleAddMode"
              title="Режим додавання"
              class="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group flex items-center justify-center"
            >
              <Icon
                name="plus"
                class="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              />
            </button>
          </div>
        </div>

        <nav class="flex-1 p-4 overflow-y-auto" v-if="!sidebarCollapsed">
          <div class="text-center">
            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Додані маркери
            </h2>
            <div class="bg-white/40 rounded-lg backdrop-blur-sm">
              <LocationList />
            </div>
          </div>
        </nav>

        <div class="p-4 border-t border-gray-100/50">
          <div class="flex justify-center">
            <button
              @click="handleLogout"
              :class="[
                'flex items-center justify-center space-x-2 px-4 py-2 text-xs font-medium text-gray-600 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed',
                sidebarCollapsed ? 'px-2' : '',
              ]"
            >
              <Icon
                name="logout"
                class="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
              />
              <span v-if="!sidebarCollapsed">Вихід</span>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <AddLocationModal />
    <EditLocationModal />
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
