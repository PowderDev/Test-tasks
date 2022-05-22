<template>
  <div class="navbar__right__avatar" data-avatar="true" @click.stop="isOpen = !isOpen">aa</div>
  <div class="details" data-details="true" v-if="isOpen">
    <figure>admin admin</figure>
    <span>Тривио</span>
    <span>Баланс: 590 000 RUB</span>
    <span>Задолженность: 590 000 RUB</span>
    <figure>Профиль</figure>
    <figure>Управление</figure>
    <figure>Моя компания</figure>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const isOpen = ref(false);

const checkDetails = (e: any) => {
  const { details } = e.target.dataset;
  const parent = e.target.parentNode;
  if (!details && !parent?.dataset?.details) isOpen.value = false;
};

watch(isOpen, () => {
  if (isOpen) {
    document.addEventListener("click", checkDetails);
  } else {
    document.removeEventListener("click", checkDetails);
  }
});
</script>

<style lang="scss" scoped>
.navbar__right__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.4rem;
  border-radius: 8px;
  background-color: hsl(240, 28%, 68%);
  cursor: pointer;
  z-index: 10;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: var(--header-height);
  right: 2rem;
  background: rgb(237, 237, 237);
  padding: 1rem;
  z-index: 10;

  span {
    font-size: 0.8rem;
    color: gray;
    padding-left: 0.5rem;
  }

  figure {
    padding: 0.2rem 0.5rem;
    border-radius: 5px;

    &:hover {
      background: rgb(185, 185, 185);
      cursor: pointer;
    }
  }
}
</style>
