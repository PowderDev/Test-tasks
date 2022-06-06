<template>
  <h1 class="text-4xl text-center">Список заявок</h1>
  <div class="flex gap-4 flex-wrap p-10 justify-center">
    <ReportListItem
      v-if="reports.length"
      v-for="report in reports"
      :key="report.region?.id"
      :report="report"
    />
    <figure v-else class="text-3xl text-center mt-5">Пока что не одной заявки</figure>
  </div>
  <div v-if="pagination.total > 1" class="flex gap-4 items-center justify-center">
    <button
      @click="changePage('prev')"
      :disabled="pagination.number === 1"
      class="px-4 py-1 bg-purple-400 disabled:bg-purple-100"
    >
      Prev
    </button>
    <button
      @click="changePage('next')"
      :disabled="pagination.number === pagination.total"
      class="px-4 py-1 bg-amber-400 disabled:bg-amber-100"
    >
      Next
    </button>
  </div>
  <div class="grid grid-rows-2 gap-4 place-items-center mt-2">
    <router-link to="/form">
      <button class="px-4 py-2 bg-blue-400 rounded-md">Подать заявку</button>
    </router-link>
    <ModeButton />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Report } from "../types";
import ReportListItem from "./ReportListItem.vue";
import ModeButton from "./ModeButton.vue";

const perPage = 4;
const pagination = reactive({ number: 1, total: 1 });
const allReports = computed<Report[]>(() => JSON.parse(localStorage.getItem("reports") || "[]"));
const reports = ref<Report[]>([]);

const getPageReports = (all: Report[], page: number) => {
  return all.slice(perPage * (page - 1), perPage * page);
};

const changePage = (dir: "prev" | "next") => {
  if (dir === "next") {
    if (pagination.total >= pagination.number + 1) {
      pagination.number += 1;
    }
  } else {
    if (1 <= pagination.number - 1) {
      pagination.number -= 1;
    }
  }
};

onMounted(() => {
  pagination.total = Math.ceil(allReports.value.length / 5);
  reports.value = getPageReports(allReports.value, pagination.number);
});

watch(
  () => pagination.number,
  () => {
    reports.value = getPageReports(allReports.value, pagination.number);
  }
);
</script>

<style scoped></style>
