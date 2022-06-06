<template>
  <main class="min-h-screen p-4 w-1/2 m-auto flex flex-col gap-3 items-center">
    <Report :report="report" />
    <StatusBlock @change-status="changeStatus" :report="report" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Report as ReportType } from "../types";
import Report from "../components/Report.vue";
import StatusBlock from "../components/StatusBlock.vue";
import { getNextStatus } from "../helpers/helper";

const route = useRoute();
const allReports: ReportType[] = JSON.parse(localStorage.getItem("reports")!);
const report = ref<ReportType>({} as ReportType);

onMounted(() => {
  report.value = allReports.find((r: ReportType) => r.id === Number(route.params["id"]))!;
});

const changeStatus = () => {
  if (localStorage.getItem("mode") === "admin") {
    const idx = allReports.findIndex((r) => r.id === report.value.id);
    const nextStatus = getNextStatus(report.value.status);
    report.value.status = nextStatus;
    allReports[idx].status = nextStatus;
    localStorage.setItem("reports", JSON.stringify(allReports));
  }
};

watch(route, () => {
  report.value = allReports.find((r: ReportType) => r.id === Number(route.params["id"]))!;
});
</script>

<style scoped></style>
