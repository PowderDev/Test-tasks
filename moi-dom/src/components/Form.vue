<template>
  <form class="p-4 w-[500px] flex flex-col gap-5">
    <SelectField
      :label="'Ваш регион:'"
      :placeholder="'Выберите свой регион'"
      :api-u-r-l="'https://pos.gosuslugi.ru/filters'"
      :value="form.region"
      @change="onChange($event, 'region')"
    />
    <SelectField
      :label="'Группа:'"
      :placeholder="'Выберите нужную вам группу'"
      :api-u-r-l="'https://pos.gosuslugi.ru/inbox-service/subjects'"
      :disabled="!form.region?.id"
      :value="form.subject"
      @change="onChange($event, 'subject')"
    />
    <SelectField
      :label="'Тип:'"
      :placeholder="'Выберите нужный вам тип'"
      :api-u-r-l="`https://pos.gosuslugi.ru/inbox-service/subsubjects/subject/${form.subject?.id}/region/${form.region?.id}`"
      :disabled="!(form.subject?.id && form.region?.id)"
      :value="form.type"
      :depended="form.subject?.id"
      @change="onChange($event, 'type')"
    />
    <FormMap :value="form.latlng" @change="onChange($event, 'latlng')" />
    <textarea
      cols="30"
      rows="6"
      class="border-2 border-black p-3 resize-none rounded-md"
      v-model="form.text"
    />
    <button class="rounded-md py-2 bg-blue-400" @click.prevent="onSubmit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { FormFields, Report, Status } from "../types";
import SelectField from "./SelectField.vue";
import FormMap from "./FormMap.vue";

const defaultForm = {
  region: null,
  subject: null,
  type: null,
  latlng: null,
  text: "",
  id: Math.round(Math.random() * 10000),
  status: Status.REGISTERED,
};

const form = reactive<Report>({ ...defaultForm });

const onSubmit = () => {
  if (localStorage.getItem("reports")) {
    const reports: Report[] = JSON.parse(localStorage.getItem("reports")!);
    localStorage.setItem("reports", JSON.stringify([...reports, form]));
  } else {
    localStorage.setItem("reports", JSON.stringify([form]));
  }

  for (const field in form) {
    if (field === "id") {
      form[field] = Math.round(Math.random() * 10000);
    } else {
      //@ts-expect-error
      form[field] = defaultForm[field];
    }
  }
};

const onChange = (value: any, t: FormFields) => (form[t] = value);
</script>

<style scoped></style>
