<template>
  <div class="wrapper-stepper">
    <div class="stepper">
      <div class="stepper-progress">
        <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
      </div>

      <div
        class="stepper-item"
        :class="{ current: step == item, success: step > item }"
        v-for="item in 5"
        :key="item"
      >
        <div class="stepper-item-counter">
          <span class="number">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    step: { type: Number, required: true },
  },
  computed: {
    stepperProgress() {
      const oneStep = 100 / 5
      let oneBall = 1
      if (this.step > 1) {
        if (this.step === 5) {
          oneBall = 0.3
        } else {
          oneBall = 0.5
        }
      }
      return oneStep * (this.step - oneBall) + "%"
    },
  },
})
</script>

<style scoped lang="scss">
$default: #c5c5c5;
$blue-1: #8cd6ff;
$success-blue: #c5ebff;
$transition: all 500ms ease;

.wrapper-stepper {
  background-color: #fff;
  border-radius: 32px;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $blue-1;
      transition: $transition;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transition;

  &-counter {
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid $default;
    position: relative;

    .number {
      font-size: 22px;
      transition: $transition;
    }
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border-color: $blue-1;
    background-color: $success-blue;
    color: #fff;
    font-weight: 600;
    f .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: $blue-1;
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: $blue-1;
    background-color: $blue-1;
    color: #fff;
    font-weight: 600;
  }
}
</style>
