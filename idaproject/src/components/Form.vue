<template>
  <div class="flex flex-1 flex-col h-full justify-center items-center gap-2">
    <h2 class="text-3xl">Добавление товара</h2>
    <form @submit.prevent="onSubmit" class="w-4/5 rounded-md shadow-2xl p-4 bg-white">
      <FormField :errors="errors" label="Наименование товара" field="title">
        <input
          @input="onChange"
          :value="form.title"
          name="title"
          placeholder="Введите наименование товара"
          class="input"
        />
      </FormField>

      <FormField :errors="errors" label="Описание товара">
        <textarea
          @input="onChange"
          :value="form.description"
          rows="4"
          name="description"
          placeholder="Введите описание товара"
          class="input"
        />
      </FormField>

      <FormField :errors="errors" label="Ссылка на изображение" field="imageURL">
        <input
          @input="onChange"
          name="imageURL"
          placeholder="Введите ссылку"
          class="input"
          :value="form.imageURL"
        />
      </FormField>

      <FormField :errors="errors" label="Цена товара" field="price">
        <input
          @input="onChange"
          name="price"
          placeholder="Введите цену"
          class="input"
          :value="form.price"
        />
      </FormField>

      <div class="mb-3">
        <button
          :disabled="!form.title || !form.price || !form.imageURL"
          type="submit"
          class="submit-button"
        >
          Добавить товар
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getRandomNumber } from "../hepler";
import { FormError, Product } from "../types";
import FormField from "./FormField.vue";

const emit = defineEmits({ onSubmit: (data: Product) => {} });

const defaultErrorMessage = "Это поле обязательно";
const errors = ref<FormError[]>([]);
const defaultFormState = { title: "", description: "", imageURL: "", price: "" };
const form = reactive({ ...defaultFormState });

const onChange = (e: any) => {
  if (!e.target.value) {
    errors.value.push({ field: e.target.name, message: defaultErrorMessage });
  } else {
    const idx = errors.value.findIndex((err) => err.field == e.target.name);
    if (idx > -1) errors.value.splice(idx, 1);
  }

  //@ts-expect-error
  form[e.target.name] = e.target.value;
};

const onSubmit = () => {
  emit("onSubmit", { ...form, id: getRandomNumber(), price: parseInt(form.price) || 0 });
  for (const field in form) {
    //@ts-expect-error
    form[field] = defaultFormState[field];
  }
};
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 bg-white placeholder-gray-300 
  border border-gray-300 rounded-md 
  focus:outline-none focus:ring focus:ring-indigo-100 
  focus:border-indigo-300;
}

.submit-button {
  @apply w-full px-3 py-4 text-white bg-green-500 
  rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed
  disabled:active:scale-100 active:scale-95;
}
</style>
