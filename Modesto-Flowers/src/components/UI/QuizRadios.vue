<template>
  <div class="options">
    <div class="radio-item option-item" v-for="radio in radios" :key="radio.id">
      <input
        type="radio"
        :id="`radio-${radio.id}`"
        name="answer"
        :value="radio"
        @change="onRadioChange(radio)"
      />
      <label :for="`radio-${radio.id}`">{{ radio.content }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    radios: { required: true },
  },
  methods: {
    onRadioChange(radio: any) {
      this.$emit("value", { radios: [radio] })
    },
  },
})
</script>

<style scoped lang="scss">
.radio-item {
  label:before {
    border-radius: 50%;
  }
}
</style>
