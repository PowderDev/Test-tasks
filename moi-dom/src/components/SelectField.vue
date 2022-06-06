<template>
  <div class="flex flex-col items-start">
    <label>{{ props.label }}</label>
    <VueSelect
      class="w-full m-0"
      :placeholder="props.placeholder"
      :options="options"
      label="name"
      :disabled="props.disabled"
      v-model="selected"
    >
      <template #list-footer>
        <li class="flex w-full mt-2 px-5 gap-2">
          <button
            class="w-full rounded-lg bg-green-400 disabled:bg-green-100 disabled:cursor-not-allowed"
            :disabled="pageConfig.first"
            @click.prevent="getOptions(pageConfig.number - 1)"
          >
            Prev
          </button>
          <button
            class="w-full rounded-lg bg-blue-400 disabled:bg-blue-100 disabled:cursor-not-allowed"
            :disabled="pageConfig.last"
            @click.prevent="getOptions(pageConfig.number + 1)"
          >
            Next
          </button>
        </li>
      </template>
    </VueSelect>
  </div>
</template>

<script setup lang="ts">
import VueSelect from "vue-select";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import axios from "axios";
import { ApiResponse, ResponseContent } from "../types";

const props = defineProps<{
  label: string;
  placeholder: string;
  apiURL: string;
  disabled?: boolean;
  value: any;
  depended?: any;
}>();
const emit = defineEmits({ change: (value: any) => {} });
const options = ref<ResponseContent>([]);
const defaultPageConfig = { first: true, last: false, number: 0 };
const pageConfig = reactive(defaultPageConfig);
const selected = ref();

const getOptions = async (page: number) => {
  const { data } = await axios.get<ApiResponse>(props.apiURL + `?page=${page}`);
  options.value = data.content || data;
  pageConfig.first = data.first;
  pageConfig.last = data.last;
  pageConfig.number = data.number;
};

onMounted(() => !props.disabled && getOptions(defaultPageConfig.number));
watch([selected], () => emit("change", selected.value));
watch(
  () => props.value,
  () => {
    if (!props.value) selected.value = props.value;
  }
);
watch(
  () => props.depended,
  () => {
    pageConfig.number = 0;
    selected.value = null;
    getOptions(defaultPageConfig.number);
  }
);
watch(
  () => props.disabled,
  () => {
    console.log("dAS");
    !props.disabled && getOptions(defaultPageConfig.number);
  }
);
</script>

<style scoped></style>
