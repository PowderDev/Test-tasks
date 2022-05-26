<template>
  <div class="p-5 pl-10 shadow-lg rounded-lg grid grid-cols-5 gap-7">
    <div class="flex items-center gap-2 col-span-3">
      <figure>UUID:</figure>
      <span>{{ receipt.uuid }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>Type:</figure>
      <span>{{ receipt.type }}</span>
    </div>
    <div class="flex items-center gap-2">
      <figure>Total:</figure>
      <span>{{ receipt.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Receipt } from "../types";

const { receipt } = defineProps<{ receipt: Receipt }>();
</script>

<style lang="scss" scoped></style>
