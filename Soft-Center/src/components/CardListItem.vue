<template>
  <div class="p-5 pl-10 shadow-lg rounded-lg grid grid-cols-3">
    <div class="flex items-center gap-2">
      <figure>Number:</figure>
      <span>{{ card.number }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>Balance:</figure>
      <span>{{ card.balance }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>Status:</figure>
      <span>{{ card.status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from "../types";

const { card } = defineProps<{ card: Card }>();
</script>

<style lang="scss" scoped></style>
