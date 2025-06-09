<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import {
  type Map as LeafletMapInstance,
  type MapOptions,
  type LatLngBoundsLiteral,
  type LatLngExpression,
  latLng,
  type PointExpression,
} from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = withDefaults(defineProps<MapOptions>(), {
  zoom: 13,
  minZoom: 2,
  maxZoom: 18,
  maxBoundsViscosity: 0.5,
  worldCopyJump: true,
})

const { center, zoom, minZoom, maxZoom, maxBoundsViscosity, worldCopyJump } = toRefs(props)

const defaultBounds: LatLngBoundsLiteral = [
  [-90, -180],
  [90, 180],
]
const mapCenter = computed<PointExpression>(() => {
  const ll = latLng(center.value as LatLngExpression)
  return [ll.lat, ll.lng]
})
const mapBounds = computed<LatLngBoundsLiteral>(() => {
  return (props.maxBounds as LatLngBoundsLiteral) || defaultBounds
})

const mapRef = ref<InstanceType<typeof LMap> | null>(null)

function onMapReady(map: LeafletMapInstance) {
  map.invalidateSize()
  map.setMaxBounds(mapBounds.value)
}
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
    </l-map>
  </div>
</template>
