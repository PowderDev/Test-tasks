<template>
  <div class="flex flex-col">
    <List :loading="loading">
      <div class="flex justify-between px-10">
        <h2>Количество элементов: {{ cards.length }}</h2>
        <h2>
          Суммарный баланс: {{ cards.reduce((acc, item) => acc + parseFloat(item.balance), 0) }}
        </h2>
      </div>
      <CardListItem
        v-for="(card, index) in cards"
        :data-index="index"
        :key="card.uuid"
        :card="card"
      />
    </List>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $api } from "../http/index";
import { Card } from "../types/index";
import CardListItem from "./CardListItem.vue";
import List from "./UI/List.vue";

const cards = ref<Card[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const { data } = await $api.get<Card[]>("/card");
  cards.value = data;
  loading.value = false;
});
</script>

<style lang="scss" scoped></style>
