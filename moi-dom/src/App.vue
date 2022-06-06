<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <router-view></router-view>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  overflow-y: scroll;
}

#app {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
}
</style>
