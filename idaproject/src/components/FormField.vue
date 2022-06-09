<template>
  <div class="mb-4">
    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">{{ label }}</label>
    <slot></slot>
    <div
      v-if="field && errors.find((err) => err.field == field)"
      class="empty-feedback text-red-400 text-sm mt-1"
    >
      {{ errors.find((err) => err.field == field)?.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormError } from "../types";

const { errors, label, field } = defineProps<{
  errors: FormError[];
  label: string;
  field?: FormError["field"];
}>();
</script>

<style scoped></style>
