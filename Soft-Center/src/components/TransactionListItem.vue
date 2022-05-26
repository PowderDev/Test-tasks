<template>
  <div class="p-5 pl-10 shadow-lg rounded-lg grid grid-cols-5 gap-5">
    <div class="flex items-center gap-2 col-span-3">
      <figure>UUID:</figure>
      <span>{{ transaction.uuid }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>State:</figure>
      <span>{{ transaction.state }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>Period:</figure>
      <span>{{ displayDate(Number(transaction.period)) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Transaction } from "../types";
const displayDate = (date: number) => new Date(date).toISOString().substring(0, 10);
const { transaction } = defineProps<{ transaction: Transaction }>();
</script>

<style lang="scss" scoped></style>
