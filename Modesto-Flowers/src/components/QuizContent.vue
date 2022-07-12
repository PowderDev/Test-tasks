<template>
  <div class="quiz-content">
    <h2 v-if="currentQuiz">{{ currentQuiz.question }} {{ `(${step}/${totalSteps})` }}</h2>
    <QuizRadios
      :radios="currentQuiz.radios"
      v-if="currentQuiz && currentQuiz.radios"
      @value="setAnswer"
    />
    <QuizCheckboxes
      :checkboxes="currentQuiz.checkboxes"
      v-if="currentQuiz && currentQuiz.checkboxes"
      @value="setAnswer"
    />
    <QuizTextarea
      v-if="currentQuiz.textarea"
      :properties="currentQuiz.textarea"
      :selectedFieldIds="selectedFieldIds"
      @value:update="setAnswer"
    />
  </div>
</template>

<script lang="ts">
import { ObjectAny, Option } from "@/types"
import Vue from "vue"
import QuizCheckboxes from "./UI/QuizCheckboxes.vue"
import QuizRadios from "./UI/QuizRadios.vue"
import QuizTextarea from "./UI/QuizTextarea.vue"

export default Vue.extend({
  components: { QuizRadios, QuizCheckboxes, QuizTextarea },
  data: (): { selectedFieldIds: number[] } => ({
    selectedFieldIds: [],
  }),
  props: {
    currentQuiz: { type: Object, required: true },
    step: { type: Number, required: true },
    totalSteps: { type: Number, required: true },
  },
  methods: {
    setAnswer(val: ObjectAny) {
      let ids: number[] = []
      if (val.checkboxes) {
        ids = val.checkboxes.map((c: Option) => c.id)
      } else if (val.radios) {
        ids = val.radios.map((c: Option) => c.id)
      }

      this.selectedFieldIds = ids

      this.$emit("answer:update", val)
    },
  },
  watch: {
    step() {
      this.selectedFieldIds = []
    },
  },
})
</script>

<style lang="scss">
.quiz-content {
  h2 {
    font-weight: 500;
    font-size: 17px;
    margin: 2rem 0 1rem 0;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;

    .option-item {
      position: relative;
      height: 30px;
      display: flex;
      align-items: flex-end;
      gap: 1rem;

      input[type="checkbox"] {
        display: none;
      }

      input[type="radio"] {
        display: none;
      }

      label:before {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 18px;
        height: 18px;
        background: #e6e6e6;
        border: 2px solid #b3b3b3;
      }

      input:checked + label:before {
        background-image: url("../assets/checked.svg");
        background-color: rgb(76, 76, 76);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: 15px;
      }

      label {
        margin-left: 30px;
      }
    }
  }
}
</style>
