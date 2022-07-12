<template>
  <div id="app">
    <HomeHeader v-once />
    <QuizPopup v-if="!checkIfQuizFinished" v-show="popupOpened" @close="popupOpened = false" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import QuizPopup from "./components/QuizPopup.vue"
import HomeHeader from "./components/UI/HomeHeader.vue"

export default Vue.extend({
  name: "App",
  components: {
    HomeHeader,
    QuizPopup,
  },
  data: () => ({
    popupOpened: true,
  }),
  computed: {
    checkIfQuizFinished: () => {
      return !!localStorage.getItem("quizFinished")
    },
  },
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto Mono", sans-serif;
}

#app {
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  height: 100vh;
}
</style>
