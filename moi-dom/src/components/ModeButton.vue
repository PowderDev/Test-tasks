<template>
  <button @click="toggleAdminMode" class="m-auto px-2 py-1 bg-emerald-400 rounded-md">
    {{ mode === "admin" ? "Disable" : "Enable" }} Admin Mode
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const mode = ref<"admin" | "user">("user");

onMounted(() => {
  if (localStorage.getItem("mode") === "admin") {
    mode.value = "admin";
  }
});

const toggleAdminMode = () => {
  const m = mode.value === "admin" ? "user" : "admin";
  localStorage.setItem("mode", m);
  mode.value = m;
};
</script>

<style scoped></style>
