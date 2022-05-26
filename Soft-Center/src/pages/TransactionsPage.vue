<template>
  <div class="flex flex-col w-full justify-center items-center gap-12">
    <Navbar />
    <h1 class="text-3xl">Cписок транзакции</h1>
    <div class="w-10/12">
      <TransactionList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TransactionList from "../components/TransactionList.vue";
import Navbar from "../components/UI/Navbar.vue";
</script>

<style scoped></style>
