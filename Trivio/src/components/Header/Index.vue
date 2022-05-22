<template>
  <nav id="navbar">
    <div class="navbar__left">
      <div class="navbar__left__logo">
        <img
          src="https://static.tildacdn.com/tild3066-6636-4963-b665-346538363839/logo-TRIVIO_g_dark-b.svg"
        />
      </div>
      <div class="navbar__left__navigation">
        <div
          class="navbar__left__navigation__item"
          v-for="(_, index) in routes"
          :key="index"
          :class="{ active: index === 0 }"
        >
          Навигация {{ index }}
        </div>
      </div>
    </div>
    <div class="navbar__right">
      <span
        class="material-icons navbar__right__icon"
        :style="{ color: value }"
        v-for="(value, key) in icons"
      >
        {{ key }}
      </span>
      <Avatar />
    </div>
  </nav>
</template>

<script setup lang="ts">
import Avatar from "./Avatar.vue";

const routes = Array.from({ length: 5 });
const icons = {
  search: "blue",
  info: "red",
  timelapse: "orange",
  favorite_border: "black",
  email: "green",
};
</script>

<style lang="scss" scoped>
#navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  padding: 0rem 2rem;
  flex-wrap: wrap;

  .navbar__left {
    display: flex;
    align-items: center;
    gap: 5rem;
    flex-wrap: wrap;

    &__logo {
      width: 10rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__navigation {
      display: flex;
      align-items: center;
      gap: 1rem;

      &__item {
        cursor: pointer;
      }

      &__item.active {
        color: blue;
      }
    }
  }

  .navbar__right {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;

    &__icon {
      font-size: 1.7rem;
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
