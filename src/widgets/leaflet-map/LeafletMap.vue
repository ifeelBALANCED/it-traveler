<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup, LControl } from '@vue-leaflet/vue-leaflet'
import type {
  Map as LeafletMap,
  LatLngExpression,
  LatLngBoundsLiteral,
  PointExpression,
  LatLngTuple,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Marker {
  id: string
  latitude: number
  longitude: number
  title?: string
}

type Props = {
  center?: LatLngExpression
  zoom?: number
  minZoom?: number
  maxZoom?: number
  maxBounds?: LatLngBoundsLiteral
  maxBoundsViscosity?: number
  worldCopyJump?: boolean
  markers?: Marker[]
  zoomToNewMarker?: boolean
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
  zoomToNewMarker: true,
  newMarkerZoom: 15,
})

const emit = defineEmits<{
  (e: 'mapClick', coords: { lat: number; lng: number }): void
  (e: 'markerClick', marker: Marker): void
}>()

const mapRef = ref<InstanceType<typeof LMap> | null>(null)
const lastMarkerId = ref<string | null>(null)
const leafletMap = computed(() => mapRef.value?.leafletObject ?? null)
const mapCenter = computed<PointExpression>(() => props.center as [number, number])
const mapBounds = computed<LatLngBoundsLiteral>(() => props.maxBounds ?? defaultBounds)
const defaultBounds: LatLngBoundsLiteral = [
  [-90, -180],
  [90, 180],
]

function initializeMap(mapInstance: LeafletMap) {
  nextTick(() => {
    mapInstance.invalidateSize()
    mapInstance.setMaxBounds(mapBounds.value)
  })
  mapInstance.on('click', (e) => {
    emit('mapClick', { lat: e.latlng.lat, lng: e.latlng.lng })
  })
}

function resetView() {
  if (!leafletMap.value) return
  leafletMap.value.flyTo(mapCenter.value as LatLngExpression, props.zoom, { duration: 0.5 })
}

function locateMe() {
  if (!leafletMap.value) return
  leafletMap.value
    .locate({ setView: true, maxZoom: props.newMarkerZoom })
    .on('locationerror', () => console.warn('Location unavailable'))
}

function zoomToMarker(marker: Marker) {
  if (!leafletMap.value || !props.zoomToNewMarker) return
  leafletMap.value.flyTo([marker.latitude, marker.longitude], props.newMarkerZoom!, {
    duration: 0.5,
  })
}

watch(
  () => props.markers,
  (newList, oldList) => {
    if (!leafletMap.value || !newList?.length) return

    if (newList.length > 1) {
      const coords = newList.map((m) => [m.latitude, m.longitude] as LatLngTuple)
      nextTick(() => leafletMap.value?.fitBounds(coords, { padding: [40, 40] }))
    } else {
      const latest = newList[0]
      const isNew = !oldList?.length || latest.id !== lastMarkerId.value
      if (isNew) {
        lastMarkerId.value = latest.id
        nextTick(() => zoomToMarker(latest))
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="relative w-full h-full">
    <l-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :max-bounds="mapBounds"
      :max-bounds-viscosity="maxBoundsViscosity"
      :world-copy-jump="worldCopyJump"
      :use-global-leaflet="false"
      @ready="initializeMap"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :max-zoom="maxZoom"
        layer-type="base"
        name="OpenStreetMap"
      />

      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="[marker.latitude, marker.longitude]"
        @click="emit('markerClick', marker)"
      >
        <l-popup>{{ marker.title || 'Без назви' }}</l-popup>
      </l-marker>

      <l-control position="bottomleft">
        <div class="flex flex-col space-y-2 p-2 bg-white bg-opacity-80 rounded-lg shadow-lg">
          <button
            @click.stop="resetView"
            title="Reset view"
            class="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <circle cx="12" cy="12" r="4" stroke-width="2" />
              <line x1="12" y1="2" x2="12" y2="6" stroke-width="2" stroke-linecap="round" />
              <line x1="12" y1="18" x2="12" y2="22" stroke-width="2" stroke-linecap="round" />
              <line x1="2" y1="12" x2="6" y2="12" stroke-width="2" stroke-linecap="round" />
              <line x1="18" y1="12" x2="22" y2="12" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <button
            @click.stop="locateMe"
            title="Locate me"
            class="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3z"
              />
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 22s8-4.438 8-10a8 8 0 1 0-16 0c0 5.562 8 10 8 10z"
              />
            </svg>
          </button>
        </div>
      </l-control>
    </l-map>
  </div>
</template>

<style scoped></style>
