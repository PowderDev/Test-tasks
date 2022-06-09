<template>
  <main class="h-full flex gap-4 bg-gray-50">
    <Form @on-submit="addProduct" />
    <div class="flex-[2.2] flex flex-col p-4 items-end">
      <SortSelect v-if="products.length > 0" @on-sort-type-change="onSortTypeChange" />
      <ProductList v-if="products.length > 0" :products="products" @remove="removeProduct" />
      <div v-else class="m-auto">
        <h2 class="text-xl">У вас еще нет товаров</h2>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ProductList from "./components/ProductList.vue";
import Form from "./components/Form.vue";
import { Product, SortType } from "./types";
import { onMounted, ref } from "vue";
import SortSelect from "./components/SortSelect.vue";

const products = ref<Product[]>([]);

onMounted(() => {
  products.value = JSON.parse(localStorage.getItem("products") || "[]");
});

const addProduct = (product: Product) => {
  products.value.unshift(product);
  localStorage.setItem("products", JSON.stringify(products.value));
};
const removeProduct = (id: number) => {
  const idx = products.value.findIndex((p) => p.id === id);
  products.value.splice(idx, 1);
  localStorage.setItem("products", JSON.stringify(products.value));
};

const onSortTypeChange = (type: SortType) => {
  if (type === "min") {
    products.value.sort((a, b) => a.price - b.price);
  } else if (type === "max") {
    products.value.sort((a, b) => b.price - a.price);
  } else {
    products.value.sort((a, b) => (a.title > b.title ? 1 : -1));
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

#app {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}
</style>
