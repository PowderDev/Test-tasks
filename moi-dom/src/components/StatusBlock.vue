<template>
  <div
    @click="emit('changeStatus')"
    class="flex gap-2 items-center px-2 py-1 shadow-lg border-2 border-gray-400 rounded-lg cursor-pointer"
  >
    <div :class="`rounded-full w-5 h-5 ${ColorClassByStatus[report.status]}`" />
    <figure>{{ report.status }}</figure>
  </div>
</template>

<script setup lang="ts">
import { Report, ColorClassByStatus } from "../types";

const { report } = defineProps<{ report: Report }>();
const emit = defineEmits({
  changeStatus: () => {},
});
</script>

<style scoped></style>
