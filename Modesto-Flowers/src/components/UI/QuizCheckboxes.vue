<template>
  <div class="options">
    <div class="checkbox-item option-item" v-for="checkbox in checkboxes" :key="checkbox.id">
      <input
        type="checkbox"
        :id="`checkbox-${checkbox.id}`"
        name="answer"
        :value="checkbox"
        @change="onCheckboxChange(checkbox)"
      />
      <label :for="`checkbox-${checkbox.id}`">{{ checkbox.content }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Option } from "@/types"
import Vue from "vue"

export default Vue.extend({
  props: {
    checkboxes: { required: true },
  },
  data: (): { selectedCheckboxes: Option[] } => ({
    selectedCheckboxes: [],
  }),
  methods: {
    onCheckboxChange(checkbox: Option) {
      if (this.selectedCheckboxes.find((c) => c.id === checkbox.id)) {
        this.selectedCheckboxes = this.selectedCheckboxes.filter((c) => c.id !== checkbox.id)
      } else {
        this.selectedCheckboxes.push(checkbox)
      }

      this.$emit("value", { checkboxes: this.selectedCheckboxes })
    },
  },
})
</script>

<style scoped lang="scss">
.checkbox-item {
  label:before {
    border-radius: 15%;
  }
}
</style>
