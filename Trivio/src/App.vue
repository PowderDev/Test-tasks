<script setup lang="ts">
import Header from "./components/Header/Index.vue";
</script>

<template>
  <Header />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --header-height: 75px;
}

#app {
  font-family: "Poppins", sans-serif;
  height: 100%;
}
</style>
