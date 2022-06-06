<template>
  <div class="flex flex-col items-center gap-3">
    <figure class="text-3xl"><strong>Регион:</strong> {{ props.report.region?.name }}</figure>
    <figure class="text-3xl"><strong>Группа:</strong> {{ props.report.subject?.name }}</figure>
    <figure class="text-3xl"><strong>Тип:</strong> {{ props.report.type?.name }}</figure>
    <div ref="$map" class="h-[350px] w-full"></div>
    <p class="whitespace-pre-line">{{ props.report.text }}</p>
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import { ref, watch } from "vue";
import { Report } from "../types";

const props = defineProps<{ report: Report }>();
const $map = ref({} as HTMLDivElement);
const map = ref<L.Map>();

watch(props, () => {
  if (props.report.latlng && !map.value) {
    //@ts-expect-error
    map.value = L.map($map.value).setView([props.report.latlng.lat, props.report.latlng.lng], 13);
    L.marker(props.report.latlng).addTo(map.value);
  }
});
</script>

<style scoped></style>
