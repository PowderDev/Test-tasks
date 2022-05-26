<template>
  <div class="flex flex-col items-center gap-5">
    <div class="flex items-center gap-2 pr-5">
      <label for="from">From:</label>
      <input
        @change="handleInputChange"
        type="text"
        name="from"
        id="from"
        placeholder="12.10.2021"
        class="input"
      />
    </div>
    <div class="flex items-center gap-2">
      <label for="to">To:</label>
      <input
        @change="handleInputChange"
        type="text"
        name="to"
        id="to"
        placeholder="05.25.2022"
        class="input"
      />
    </div>
    <button @click.prevent="emitSearch" class="button">Search</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const emitter = defineEmits({
  search: (form: { from: number; to: number }) => {},
});

const form = reactive({ from: 0, to: Date.now() });

const handleInputChange = (e: any) => {
  const date = new Date(e.target.value).getTime();
  //@ts-expect-error
  if (!Number.isNaN(date)) form[e.target.name] = date;
  //@ts-expect-error
  if (Number.isNaN(date)) form[e.target.name] = 0;
};

const emitSearch = () => emitter("search", form);
</script>

<style scoped>
.input {
  @apply border-2 border-black outline-none rounded-lg p-2;
}

.button {
  @apply border-2 rounded-xl border-blue-500 bg-slate-100 px-6 py-2;
}
</style>
