<template>
  <div v-if="properties">
    <textarea
      :placeholder="properties.placeholder"
      :disabled="isDisabled"
      @change="setValue($event.target.value)"
      :value="value"
      rows="5"
      cols="60"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    properties: { type: Object, required: true },
    selectedFieldIds: { type: Array, required: true },
  },
  data: () => ({
    value: "",
  }),
  computed: {
    isDisabled() {
      if (this.properties?.activeWhenSelected) {
        if (this.selectedFieldIds.includes(this.properties?.activeWhenSelected)) {
          return false
        }
      } else {
        if (!this.selectedFieldIds.includes(this.properties?.disabledWhenSelected)) {
          return false
        }
      }

      return true
    },
  },
  methods: {
    setValue(value: string) {
      this.value = value
      this.$emit("value:update", { textarea: value })
    },
  },
  watch: {
    properties() {
      this.value = ""
    },
  },
})
</script>

<style scoped lang="scss">
textarea {
  outline: none;
  background: #f5f5f5;
  border: 4px solid #b3b3b3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  resize: none;
  margin: 1rem 0;
  padding: 1rem;

  &:disabled {
    background: #e6e6e6;
    border-color: #b3b3b3;
    box-shadow: none;
    cursor: not-allowed;
  }
}
</style>
