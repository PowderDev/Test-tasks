<template>
  <div ref="$map" class="h-[250px] w-full z-0"></div>
</template>

<script setup lang="ts">
import L, { LatLngExpression } from "leaflet";
import { onMounted, onUnmounted, ref, watch } from "vue";

const emit = defineEmits({
  change: (latlng: LatLngExpression) => {},
});

const props = defineProps<{ value: LatLngExpression | null }>();

const $map = ref({} as HTMLDivElement);
const map = ref<L.Map>();
const currMarker = ref<L.Marker<any>>();

onMounted(() => {
  map.value = L.map($map.value).setView([51.505, -0.09], 13).addEventListener("click", onMapClick);
});

const onMapClick = (e: { latlng: LatLngExpression }) => {
  if (currMarker.value) currMarker.value.remove();
  currMarker.value = L.marker(e.latlng).addTo(map.value!);
  emit("change", e.latlng);
};

onUnmounted(() => map.value?.removeEventListener("click", onMapClick));
watch(props, () => {
  if (!props.value && currMarker.value) {
    currMarker.value.remove();
  }
});
</script>

<style scoped></style>
