<template>
  <ListWithSearch @search="searchHandler" :length="transactions.length" :loading="loading">
    <div class="flex justify-between px-10">
      <h2>Количество элементов: {{ transactions.length }}</h2>
    </div>
    <TransactionListItem
      v-if="!loading"
      v-for="(transaction, index) in transactions"
      :data-index="index"
      :key="transaction.uuid"
      :transaction="transaction"
    />
  </ListWithSearch>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $api } from "../http/index";
import { Transaction } from "../types/index";
import TransactionListItem from "./TransactionListItem.vue";
import ListWithSearch from "./UI/ListWithSearch.vue";

const transactions = ref<Transaction[]>([]);
const loading = ref(false);

const getData = async (form: { from: number; to: number }) => {
  loading.value = true;
  const { data } = await $api.get<Transaction[]>(`/transaction?from=${form.from}?to=${form.to}`);
  transactions.value = data;
  loading.value = false;
};

onMounted(async () => await getData({ from: 0, to: Date.now() }));
const searchHandler = async (data: { from: number; to: number }) => await getData(data);
</script>

<style lang="scss" scoped></style>
