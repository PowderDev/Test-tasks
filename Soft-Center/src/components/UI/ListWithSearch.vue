<template>
  <div class="flex items-start gap-10">
    <SearchForm @search="searchHandler" />

    <List :loading="loading">
      <slot v-if="!loading && length > 0"></slot>
      <div class="grid place-items-center" v-if="length == 0 && !loading">
        <h2>There is nothing yet</h2>
        <h4>from: {{ displayDate(form.from) }} => to: {{ displayDate(form.to) }}</h4>
      </div>
    </List>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import List from "./List.vue";
import SearchForm from "./SearchForm.vue";

const form = reactive({ from: 0, to: Date.now() });
const { loading, length } = defineProps<{ loading: boolean; length: number }>();
const emitter = defineEmits({
  search: (form: { from: number; to: number }) => {},
});

const displayDate = (date: number) => new Date(date).toISOString().substring(0, 10);

const searchHandler = async (data: { from: number; to: number }) => {
  form.from = data.from;
  form.to = data.to;
  emitter("search", data);
};
</script>

<style lang="scss" scoped></style>
