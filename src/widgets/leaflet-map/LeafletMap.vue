<script setup lang="ts">
import { ref, computed, toRefs, watch, nextTick } from 'vue'
import { defineProps, defineEmits, withDefaults } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import {
  type Map as LeafletMapInstance,
  type MapOptions,
  type LatLngBoundsLiteral,
  type LatLngExpression,
  latLng,
  type PointExpression,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Marker = {
  id: string
  latitude: number
  longitude: number
  title?: string
}

const props = withDefaults(
  defineProps<
    MapOptions & {
      markers?: Marker[]
      zoomToNewMarker?: boolean
      newMarkerZoom?: number
    }
  >(),
  {
    zoom: 13,
    minZoom: 2,
    maxZoom: 18,
    maxBoundsViscosity: 0.5,
    worldCopyJump: true,
    markers: () => [],
    zoomToNewMarker: true,
    newMarkerZoom: 15,
  },
)

const {
  center,
  zoom,
  minZoom,
  maxZoom,
  maxBounds,
  maxBoundsViscosity,
  worldCopyJump,
  markers,
  zoomToNewMarker,
  newMarkerZoom,
} = toRefs(props)

const defaultBounds: LatLngBoundsLiteral = [
  [-90, -180],
  [90, 180],
]

const mapCenter = computed<PointExpression>(() => {
  const ll = latLng(center.value as LatLngExpression)
  return [ll.lat, ll.lng]
})

const mapBounds = computed<LatLngBoundsLiteral>(() => {
  return (maxBounds.value as LatLngBoundsLiteral) || defaultBounds
})

const emit = defineEmits<{
  (e: 'map-click', coords: { lat: number; lng: number }): void
  (e: 'marker-click', marker: Marker): void
}>()

const mapRef = ref<InstanceType<typeof LMap> | null>(null)
const leafletMap = ref<LeafletMapInstance | null>(null)
const previousMarkerIds = ref<Set<string>>(new Set())

function onMapReady(map: LeafletMapInstance) {
  leafletMap.value = map
  map.invalidateSize()
  map.setMaxBounds(mapBounds.value)
  map.on('click', (e) => {
    const { lat, lng } = e.latlng
    emit('map-click', { lat, lng })
  })

  previousMarkerIds.value = new Set(markers.value.map((m) => m.id))
}

watch(
  () => markers.value,
  async (newMarkers) => {
    if (!zoomToNewMarker.value || !leafletMap.value || !newMarkers.length) return

    const currentMarkerIds = new Set(newMarkers.map((m) => m.id))
    const newMarkerIds = [...currentMarkerIds].filter((id) => !previousMarkerIds.value.has(id))

    if (newMarkerIds.length > 0) {
      const latestNewMarker = newMarkers.find((m) => newMarkerIds.includes(m.id))

      if (latestNewMarker) {
        await nextTick()

        leafletMap.value.flyTo(
          [latestNewMarker.latitude, latestNewMarker.longitude],
          newMarkerZoom.value,
          {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25,
          },
        )
      }
    }

    previousMarkerIds.value = currentMarkerIds
  },
  { deep: true },
)
</script>

<template>
  <div class="w-full h-full">
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
      style="width: 100%; height: 100%"
      @ready="onMapReady"
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
        @click="emit('marker-click', marker)"
      >
        <l-popup>
          {{ marker.title || 'No title' }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<style>
#map,
.l-map {
  width: 100%;
  height: 100%;
}
</style>
