<template>
  <ListWithSearch @search="searchHandler" :length="receipts.length" :loading="loading">
    <div class="flex justify-between px-10">
      <h2>Количество элементов: {{ receipts.length }}</h2>
      <h2>
        Суммарная сумма: {{ receipts.reduce((acc, item) => acc + parseFloat(item.total), 0) }}
      </h2>
    </div>
    <ReceiptListItem
      v-if="!loading"
      v-for="(receipt, index) in receipts"
      :data-index="index"
      :key="receipt.uuid"
      :receipt="receipt"
    />
  </ListWithSearch>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { $api } from "../http/index";
import { Receipt } from "../types/index";
import ReceiptListItem from "./ReceiptListItem.vue";
import ListWithSearch from "./UI/ListWithSearch.vue";

const receipts = ref<Receipt[]>([]);
const loading = ref(false);

const getData = async (form: { from: number; to: number }) => {
  loading.value = true;
  const { data } = await $api.get<Receipt[]>(`/receipt?from=${form.from}?to=${form.to}`);
  receipts.value = data;
  loading.value = false;
};

onMounted(async () => await getData({ from: 0, to: Date.now() }));
const searchHandler = async (data: { from: number; to: number }) => await getData(data);
</script>

<style lang="scss" scoped></style>
