<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import type {
  Map as LeafletMap,
  LatLngBoundsLiteral,
  LeafletMouseEvent,
  LatLngTuple,
} from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Marker {
  id: string
  latitude: number
  longitude: number
  title?: string
}

type Props = {
  center?: LatLngTuple
  zoom?: number
  minZoom?: number
  maxZoom?: number
  maxBounds?: LatLngBoundsLiteral
  maxBoundsViscosity?: number
  worldCopyJump?: boolean
  markers?: Marker[]
  newMarkerZoom?: number
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [0, 0],
  zoom: 13,
  minZoom: 2,
  maxZoom: 18,
  maxBoundsViscosity: 0.5,
  worldCopyJump: true,
  markers: () => [],
  newMarkerZoom: 15,
})

const emit = defineEmits<{
  (e: 'mapClick', coords: { lat: number; lng: number }): void
  (e: 'markerClick', marker: Marker): void
}>()

const mapRef = ref<InstanceType<typeof LMap> | null>(null)
const leafletMap = computed(() => mapRef.value?.leafletObject ?? null)

const mapCenter = computed(() => props.center || [0, 0])
const mapBounds = computed<LatLngBoundsLiteral>(
  () =>
    props.maxBounds ?? [
      [-90, -180],
      [90, 180],
    ],
)

const isAddMode = ref(false)
const tooltipText = ref('')
const tooltipStyle = ref<Record<string, string>>({})
const cursorStyle = ref<Record<string, string>>({})

let previewMarker: L.Marker | null = null

function initializeMap(map: LeafletMap) {
  nextTick(() => {
    map.invalidateSize()
    map.setMaxBounds(mapBounds.value)
  })
  map.on('click', onMapClick)
}

function onMapClick(e: LeafletMouseEvent) {
  if (!isAddMode.value) return
  emit('mapClick', { lat: e.latlng.lat, lng: e.latlng.lng })

  disableAddMode()
}

function onMouseMove(e: LeafletMouseEvent) {
  const lat = e.latlng.lat.toFixed(5)
  const lng = e.latlng.lng.toFixed(5)
  const ev = e.originalEvent as MouseEvent
  tooltipText.value = `${lat}, ${lng}`
  tooltipStyle.value = { left: `${ev.clientX + 12}px`, top: `${ev.clientY + 12}px` }
  cursorStyle.value = { left: `${ev.clientX}px`, top: `${ev.clientY}px` }
  if (!previewMarker && leafletMap.value) return
  previewMarker?.setLatLng(e.latlng)
}

function enableAddMode() {
  const map = leafletMap.value!
  isAddMode.value = true
  map.getContainer().style.cursor = 'none'
  map.on('mousemove', onMouseMove)
}

function disableAddMode() {
  const map = leafletMap.value!
  isAddMode.value = false
  map.getContainer().style.cursor = ''
  map.off('mousemove', onMouseMove)
  previewMarker?.remove()
  previewMarker = null
  tooltipText.value = ''
}

function toggleAddMode() {
  if (isAddMode.value) {
    disableAddMode()
  } else {
    enableAddMode()
  }
}

function resetView() {
  leafletMap.value?.flyTo(mapCenter.value, props.zoom!, { duration: 0.5 })
}

function locateMe() {
  leafletMap.value
    ?.locate({ setView: true, maxZoom: props.newMarkerZoom })
    .on('locationerror', () => console.warn('Location unavailable'))
}

onBeforeUnmount(() => {
  leafletMap.value?.off('click', onMapClick)
  leafletMap.value?.off('mousemove', onMouseMove)
})
</script>

<template>
  <div class="relative w-full h-full">
    <div
      v-if="isAddMode"
      class="pin-cursor relative pointer-events-none animate-bounce"
      :style="cursorStyle"
    >
      <div class="cursor-ring"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-blue-600 relative z-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    </div>
    <div
      v-if="isAddMode && tooltipText"
      class="absolute pointer-events-none bg-white bg-opacity-90 text-xs p-1 rounded shadow"
      :style="tooltipStyle"
    >
      {{ tooltipText }}
    </div>
    <l-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :max-bounds="mapBounds"
      :max-bounds-viscosity="maxBoundsViscosity"
      :world-copy-jump="worldCopyJump"
      @ready="initializeMap"
      class="w-full h-full"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :max-zoom="maxZoom" />
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="[marker.latitude, marker.longitude]"
        @click="emit('markerClick', marker)"
        class="drop-animation"
      >
        <l-popup>{{ marker.title || 'Без назви' }}</l-popup>
      </l-marker>
      <l-control position="bottomleft">
        <div class="flex flex-col space-y-2 p-2 bg-white bg-opacity-80 rounded-lg shadow-lg">
          <button
            @click.stop="resetView"
            title="Reset view"
            class="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <button
            @click.stop="locateMe"
            title="Locate me"
            class="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>
          <button
            @click.stop="toggleAddMode"
            :title="isAddMode ? 'Click map to drop pin' : 'Add a pin'"
            :class="[
              'p-2 rounded focus:outline-none focus:ring flex items-center justify-center transition-all',
              isAddMode ? 'bg-blue-200' : 'hover:bg-gray-200',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              :class="isAddMode ? 'animate-bounce stroke-blue-600' : 'stroke-current'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </button>
        </div>
      </l-control>
    </l-map>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.animate-bounce {
  animation: bounce 0.6s infinite ease-in-out;
}
.preview-pin {
  pointer-events: none;
}
.pin-cursor {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
}
@keyframes drop {
  0% {
    transform: translateY(-200px);
    opacity: 0;
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-6px);
    opacity: 1;
  }
}
.drop-animation {
  animation: drop 0.6s ease-out forwards;
}
@keyframes ring {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
.pulse-ring::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  animation: ring 1s ease-out forwards;
}
.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  animation: ring 1s ease-out infinite;
}
</style>
