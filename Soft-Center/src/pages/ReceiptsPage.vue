<template>
  <div class="flex flex-col w-full justify-center items-center gap-12">
    <Navbar />
    <h1 class="text-3xl">Cписок чеков</h1>
    <div class="w-10/12">
      <ReceiptList />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReceiptList from "../components/ReceiptList.vue";
import Navbar from "../components/UI/Navbar.vue";
</script>

<style scoped></style>
