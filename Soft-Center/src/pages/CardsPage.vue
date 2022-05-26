<template>
  <div class="flex flex-col w-full justify-center items-center gap-12">
    <Navbar />
    <h1 class="text-3xl">Общий список карт</h1>
    <div class="w-7/12">
      <CardList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardList from "../components/CardList.vue";
import Navbar from "../components/UI/Navbar.vue";
</script>

<style scoped></style>
