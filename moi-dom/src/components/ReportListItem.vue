<template>
  <router-link :to="`/report/${report.id}`">
    <div class="p-4 shadow-lg rounded-md flex flex-col gap-3 cursor-pointer">
      <figure><strong>Регион:</strong> {{ report.region?.name }}</figure>
      <figure><strong>Группа:</strong> {{ report.subject?.name }}</figure>
      <figure><strong>Тип:</strong> {{ report.type?.name }}</figure>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { Report } from "../types";

const { report } = defineProps<{ report: Report }>();
</script>

<style scoped></style>
