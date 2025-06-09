<script setup lang="ts">
import { ref } from 'vue'
import { ButtonVariants } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { LeafletMap } from '@/widgets/leaflet-map'
import { useSession } from '@/entities/session'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/shared/types'
import { elysiaClient } from '@/shared/api'
import { toast } from 'vue-sonner'

const router = useRouter()
const session = useSession()
const { clear: clearSession } = session

const user = ref({
  name: 'Ратушняк Ілона',
  avatar: '/api/placeholder/40/40',
})

const locations = ref([
  {
    id: 1,
    title: 'Пункт незалежності',
    description:
      'Проект української влади, який ініціював у листопаді 2022 року на фоні масових обстрілів критичної інфраструктури з боку...',
    image: '/api/placeholder/60/60',
  },
  {
    id: 2,
    title: 'Палац Спорту',
    description:
      'Міський палац спорту (ПС) — найбільша крита спортивно-видовищна споруда України, розташована у...',
    image: '/api/placeholder/60/60',
  },
  {
    id: 3,
    title: 'ТЦ Олімпійський',
    description:
      'ТК "Олімпійський" - унікальний сучасний торговий комплекс, що задає стиль та динаміку життя XXI століття. Комплекс...',
    image: '/api/placeholder/60/60',
  },
  {
    id: 4,
    title: 'Золоті Ворота',
    description:
      "Одна з найдавніших споруд і один з символів міста. Довгий час вони слугували для парадного, церемоніального в'їзду в...",
    image: '/api/placeholder/60/60',
  },
])

async function handleLogout() {
  const { success } = await elysiaClient.postApiAuthLogout()
  if (success) {
    clearSession()
    toast.success('Logout successful')
    router.push({ name: ROUTES.LOGIN })
  }
}
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <aside
      class="flex-shrink-0 w-80 bg-white/95 backdrop-blur-sm shadow-2xl z-10 flex flex-col transition-transform duration-200"
    >
      <div class="p-4 border-b border-gray-200">
        <h1 class="text-lg font-semibold text-gray-800 mb-3">Карта</h1>
        <div class="flex items-center p-3 bg-orange-100 rounded-lg">
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-10 h-10 rounded-full object-cover mr-3"
          />
          <span class="font-medium text-gray-800">{{ user.name }}</span>
        </div>
      </div>

      <div class="flex-1 overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-sm font-medium text-gray-600 mb-3">Додані маркери</h2>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          <div
            v-for="location in locations"
            :key="location.id"
            class="group flex items-start p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <img
              :src="location.image"
              :alt="location.title"
              class="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between mb-1">
                <h3 class="font-medium text-gray-900 text-sm leading-tight">
                  {{ location.title }}
                </h3>
                <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1 hover:text-orange-500 text-gray-400">
                    <!-- edit icon -->
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                           m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button class="p-1 hover:text-red-500 text-gray-400">
                    <!-- delete icon -->
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                          a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                          m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {{ location.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-gray-200">
          <Button :variant="ButtonVariants.Gradient" class="w-full font-semibold py-3">
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
        <span
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
        </span>
      </div>
    </aside>

    <div class="flex-1 relative">
      <LeafletMap :initial-zoom="13" :center="[50.4501, 30.5234]" />
    </div>
  </div>
</template>
