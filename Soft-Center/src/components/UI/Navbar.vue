<template>
  <nav class="bg-white px-8 pt-2 rounded-md shadow-lg">
    <div class="flex justify-center items-center gap-5">
      <router-link
        v-for="(text, to) in routes"
        :to="to"
        :class="{ 'active-link': link === to, 'default-link': link !== to }"
      >
        {{ text }}
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const routes = {
  "/": "Cards",
  "/transactions": "Transactions",
  "/receipts": "Receipts",
};

const route = useRoute();
const link = ref("/");

watchEffect(() => (link.value = route.path));
</script>

<style lang="scss" scoped>
.active-link {
  @apply no-underline text-teal-500 border-b-2 border-teal-500 
    uppercase tracking-wide font-bold text-sm py-3;
}

.default-link {
  @apply no-underline text-gray-700 border-b-2 border-transparent 
    uppercase tracking-wide font-bold text-sm py-3;
}
</style>
