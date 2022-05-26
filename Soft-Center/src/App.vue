<template>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
