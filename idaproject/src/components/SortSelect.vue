<template>
  <div x-data="select" class="relative w-48 mr-10 z-10">
    <button
      type="button"
      @click="toggle"
      class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300"
      :class="open && 'ring-blue-600'"
    >
      Сортировка
    </button>

    <ul class="z-2 absolute mt-2 w-full rounded bg-gray-50 ring-1 ring-gray-300" v-if="open">
      <li
        class="cursor-pointer select-none p-2 hover:bg-gray-200"
        @click="emit('onSortTypeChange', 'min')"
      >
        От меньшего
      </li>
      <li
        class="cursor-pointer select-none p-2 hover:bg-gray-200"
        @click="emit('onSortTypeChange', 'max')"
      >
        От большего
      </li>
      <li
        class="cursor-pointer select-none p-2 hover:bg-gray-200"
        @click="emit('onSortTypeChange', 'name')"
      >
        По названию
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SortType } from "../types";

const open = ref(false);
const emit = defineEmits({ onSortTypeChange: (type: SortType) => {} });
const toggle = () => (open.value = !open.value);
</script>

<style scoped></style>
