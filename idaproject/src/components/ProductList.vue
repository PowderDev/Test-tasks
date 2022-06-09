<template>
  <div class="">
    <transition-group tag="div" name="list" class="grid grid-cols-3 place-items-center p-6 gap-2">
      <ProductListItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @remove="emit('remove', $event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { Product } from "../types";
import ProductListItem from "./ProductListItem.vue";

const emit = defineEmits({ remove: (id: number) => {} });
const { products } = defineProps<{ products: Product[] }>();
</script>

<style scoped>
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.list-move {
  transition: all 0.3s ease;
}
</style>
