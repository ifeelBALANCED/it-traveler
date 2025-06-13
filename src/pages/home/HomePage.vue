<script setup lang="ts">
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { LeafletMap } from '@/widgets/leaflet-map'
import { useSession } from '@/entities/session'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/shared/types'
import { elysiaClient } from '@/shared/api'
import { toast } from 'vue-sonner'
import { LocationList, useLocations } from '@/features/location'
import { storeToRefs } from 'pinia'

const router = useRouter()
const session = useSession()
const locationsStore = useLocations()
const { markers } = storeToRefs(locationsStore)
const { addLocationModal, setAddLocationCoords } = locationsStore
const { clear: clearSession, user } = session

async function handleLogout() {
  const { success } = await elysiaClient.postApiAuthLogout()
  if (success) {
    clearSession()
    toast.success('Logout successful')
    router.push({ name: ROUTES.LOGIN })
  }
}

function handleMapClick(coords: { lat: number; lng: number }) {
  setAddLocationCoords(coords)
  addLocationModal.open()
}
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <aside
      class="flex-shrink-0 w-80 bg-white/95 backdrop-blur-sm shadow-2xl z-10 flex flex-col transition-transform duration-200"
    >
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-lg font-semibold text-gray-800 mb-3">Карта</h1>
        <div class="flex items-center p-3 bg-orange-100 rounded-lg">
          <img
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user?.name ?? ''"
            class="w-10 h-10 rounded-full object-cover mr-3"
          />
          <span v-if="user?.name" class="font-medium text-gray-800">{{ user.name }}</span>
        </div>
      </div>

      <div class="flex-1 overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-sm font-medium text-gray-600">Додані маркери</h2>
        </div>
        <location-list />
        <div class="p-4 border-t border-gray-200">
          <Button
            :variant="ButtonVariants.Gradient"
            class="w-full font-semibold py-3"
            @click="addLocationModal.open"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Додати маркер
          </Button>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200">
        <button
          type="button"
          class="flex items-center text-sm text-gray-500 hover:text-gray-700"
          @click="handleLogout"
        >
          Вихід
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </aside>

    <div class="flex-1 relative">
      <LeafletMap
        :initial-zoom="13"
        :center="[50.4501, 30.5234]"
        :markers="markers"
        @mapClick="handleMapClick"
      />
    </div>
  </div>
</template>
