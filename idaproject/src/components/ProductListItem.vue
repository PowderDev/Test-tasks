<template>
  <div class="card group">
    <img :src="product.imageURL" alt="" class="h-[200px] w-full" />
    <div class="flex flex-col gap-5 p-4">
      <h3 class="text-2xl">{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <strong class="text-xl">{{ product.price }} руб.</strong>
    </div>
    <img src="/DeleteIcon.svg" alt="" class="delete-icon" @click="emit('remove', product.id)" />
  </div>
</template>

<script setup lang="ts">
import { Product } from "../types";

const { product } = defineProps<{ product: Product }>();
const emit = defineEmits({ remove: (id: number) => {} });
</script>

<style scoped>
.card {
  @apply flex flex-col gap-4 border-2 border-gray-300 
  hover:shadow-2xl cursor-pointer rounded-lg bg-white
  relative;
}

.delete-icon {
  @apply absolute -top-3 -right-3 group-hover:block hidden;
}
</style>
