<template>
  <div class="popup-container">
    <div class="popup">
      <h1>Please answer a few questions</h1>
      <PopupStepper :step="step" />
      <QuizContent
        :currentQuiz="currentQuiz"
        :step="step"
        :totalSteps="totalSteps"
        @answer:update="setAnswer"
      />
      <button @click="nextStep">{{ step === totalSteps ? "Done" : "Next" }}</button>
      <div class="popup-x" @click="closePopup">
        <img src="../assets/x.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import QuizContent from "./QuizContent.vue"
import PopupStepper from "./UI/PopupStepper.vue"
import axios from "axios"
import { Data } from "@/types/quizPopupComponentTypes"
import { Option, Quiz } from "@/types/index"
import { ObjectAny } from "@/types"

export default Vue.extend({
  components: { PopupStepper, QuizContent },
  data: (): Data => ({
    quizzes: [],
    step: 1,
    totalSteps: 5,
    answers: {},
  }),
  computed: {
    currentQuiz(): Quiz {
      return this.quizzes[this.step - 1]
    },
  },
  methods: {
    setAnswer(val: ObjectAny) {
      const keys = ["radios", "textarea", "checkboxes"]
      const answer = this.answers[this.step] || {}

      for (const key of keys) {
        if (this.currentQuiz[key] && val[key]) {
          answer[key] = val[key]
        }
      }

      this.answers[this.step] = answer
    },
    nextStep() {
      if (this.step !== this.totalSteps) {
        let action: Option["action"] | null = null

        if (this.answers[this.step]?.radios) {
          const radioWithAction = this.answers[this.step]?.radios.find((r: Option) => !!r.action)
          if (radioWithAction) {
            action = radioWithAction.action
          }
        }

        if (action?.redirectToStep) {
          this.step = action?.redirectToStep
        } else {
          this.step++
        }
      } else {
        localStorage.setItem("quizFinished", "true")
        this.closePopup()
        this.sendAnswers(this.answers)
      }
    },
    closePopup() {
      this.$emit("close")
    },
    sendAnswers(answers: any) {
      axios
        .post("http://localhost:8080/answer.json", answers)
        .then(() => (this.answers = {}))
        .catch((err) => console.error(err))
    },
  },
  mounted() {
    axios
      .get<Quiz[]>("http://localhost:8080/data.json")
      .then(({ data }) => (this.quizzes = data))
      .catch((err) => console.error(err))
  },
})
</script>

<style scoped lang="scss">
.popup-container {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  .popup {
    position: relative;
    width: 660px;
    height: 520px;
    background: white;
    border-radius: 5px;
    padding: 1.5rem 2.5rem;
    overflow-y: auto;

    &-x {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }

    h1 {
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    button {
      padding: 1rem 4rem;
      background: #4bbdfd;
      color: white;
      font-weight: 700;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:active {
        transform: scale(0.97);
      }
    }
  }
}
</style>
