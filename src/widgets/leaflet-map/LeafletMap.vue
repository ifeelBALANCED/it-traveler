<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import type {
  Map as LeafletMap,
  LatLngBoundsLiteral,
  LeafletMouseEvent,
  LatLngTuple,
  LatLngBoundsExpression,
  PointExpression,
  DragEndEvent,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from '@/shared/ui/icon'

interface Marker {
  id: string
  latitude: number
  longitude: number
  title?: string
}

interface Props {
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
  mapClick: [coords: { lat: number; lng: number }]
  markerClick: [marker: Marker]
  markerDrag: [marker: Marker, newCoords: { lat: number; lng: number }]
}>()

const mapRef = ref<InstanceType<typeof LMap>>()
const isAddMode = ref(false)
const tooltipText = ref('')
const tooltipStyle = ref({})
const cursorStyle = ref({})

const leafletMap = computed(() => mapRef.value?.leafletObject)
const mapBounds = computed(
  () =>
    props.maxBounds ?? [
      [-90, -180],
      [90, 180],
    ],
)

const handleMapClick = (e: LeafletMouseEvent) => {
  if (!isAddMode.value) return
  emit('mapClick', { lat: e.latlng.lat, lng: e.latlng.lng })
  disableAddMode()
}

const handleMouseMove = (e: LeafletMouseEvent) => {
  const { lat, lng } = e.latlng
  const { clientX, clientY } = e.originalEvent as MouseEvent

  tooltipText.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  tooltipStyle.value = { left: `${clientX + 12}px`, top: `${clientY + 12}px` }
  cursorStyle.value = { left: `${clientX}px`, top: `${clientY}px` }
}

const enableAddMode = () => {
  const map = leafletMap.value
  if (!map) return

  isAddMode.value = true
  map.getContainer().style.cursor = 'none'
  map.on('mousemove', handleMouseMove)
}

const disableAddMode = () => {
  const map = leafletMap.value
  if (!map) return

  isAddMode.value = false
  map.getContainer().style.cursor = ''
  map.off('mousemove', handleMouseMove)
  tooltipText.value = ''
}

const toggleAddMode = () => (isAddMode.value ? disableAddMode() : enableAddMode())
const center = computed<PointExpression>(() => [props.center[0], props.center[1]])

const resetView = () => {
  leafletMap.value?.flyTo(props.center, props.zoom, { duration: 0.5 })
}

const locateMe = () => {
  leafletMap.value
    ?.locate({ setView: true, maxZoom: props.newMarkerZoom })
    .on('locationerror', () => console.warn('Location unavailable'))
}

const initializeMap = (map: LeafletMap) => {
  nextTick(() => {
    map.invalidateSize()
    map.setMaxBounds(mapBounds.value as LatLngBoundsExpression)
  })
  map.on('click', handleMapClick)
}

const handleMarkerDrag = (marker: Marker, e: DragEndEvent) => {
  const newCoords = {
    lat: e.target.getLatLng().lat,
    lng: e.target.getLatLng().lng,
  }
  emit('markerDrag', marker, newCoords)
}

onBeforeUnmount(() => {
  const map = leafletMap.value
  if (map) {
    map.off('click', handleMapClick)
    map.off('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <div v-if="isAddMode" class="pin-cursor" :style="cursorStyle">
      <div class="cursor-ring" />
      <Icon
        name="pin-icon"
        class="size-6 text-blue-500"
        :class="isAddMode ? 'animate-bounce' : ''"
      />
    </div>

    <div
      v-if="isAddMode && tooltipText"
      class="absolute pointer-events-none bg-white/90 text-xs p-1 rounded shadow z-50"
      :style="tooltipStyle"
    >
      {{ tooltipText }}
    </div>

    <l-map
      ref="mapRef"
      :center="center"
      :zoom="props.zoom"
      :min-zoom="props.minZoom"
      :max-zoom="props.maxZoom"
      :max-bounds="mapBounds"
      :max-bounds-viscosity="props.maxBoundsViscosity"
      :world-copy-jump="props.worldCopyJump"
      @ready="initializeMap"
      class="w-full h-full"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :max-zoom="props.maxZoom"
      />

      <l-marker
        v-for="marker in props.markers"
        :key="marker.id"
        :lat-lng="[marker.latitude, marker.longitude]"
        :draggable="true"
        @click="emit('markerClick', marker)"
        @dragend="handleMarkerDrag(marker, $event)"
        class="drop-animation"
      >
        <l-popup>{{ marker.title || 'Без назви' }}</l-popup>
      </l-marker>

      <l-control position="bottomleft">
        <div class="flex flex-col space-y-2 p-2 bg-white/80 rounded-lg shadow-lg">
          <button @click.stop="resetView" title="Reset view" class="control-btn">
            <Icon name="reset-icon" class="size-6 text-blue-500" />
          </button>
          <button @click.stop="locateMe" title="Locate me" class="control-btn">
            <Icon name="locate-icon" class="size-6 text-blue-500" />
          </button>

          <button
            @click.stop="toggleAddMode"
            :title="isAddMode ? 'Click map to drop pin' : 'Add a pin'"
            :class="['control-btn transition-all', isAddMode ? 'bg-blue-200' : '']"
          >
            <Icon
              name="pin-icon"
              class="size-6 text-blue-500"
              :class="isAddMode ? 'animate-bounce' : ''"
            />
          </button>
        </div>
      </l-control>
    </l-map>
  </div>
</template>

<style scoped>
.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
}

.pin-cursor {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
  animation: bounce 0.6s infinite ease-in-out;
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

.drop-animation {
  animation: drop 0.6s ease-out forwards;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
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
</style>
