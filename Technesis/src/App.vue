<template>
  <div class="main">
    <div class="main__tags-block">
      <TextTags :tags="tags" :showDivider="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextTags from "./components/TextTags.vue";

const tags = [
  { text: "Beautiful", icon: "mdi-heart" },
  { text: "Notebook", icon: "mdi-note" },
  { text: "Schedule", icon: "mdi-calendar" },
  { text: "Beautiful", icon: "mdi-heart" },
  { text: "Notebook", icon: "mdi-note" },
  { text: "Schedule", icon: "mdi-calendar" },
  { text: "Beautiful", icon: "mdi-heart" },
  { text: "Schedule", icon: "mdi-calendar" },
  { text: "Beautiful", icon: "mdi-heart" },
  { text: "Notebook", icon: "mdi-note" },
  { text: "Notebook", icon: "mdi-note" },
  { text: "Schedule", icon: "mdi-calendar" },
  { text: "Beautiful", icon: "mdi-heart" },
  { text: "Notebook", icon: "mdi-note" },
  { text: "Schedule", icon: "mdi-calendar" },
  { text: "Beautiful", icon: "mdi-heart" },
];
</script>

<style lang="scss">
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  &__tags-block {
    width: 570px;
    height: 270px;
    resize: both;
    overflow: auto;
  }
}
</style>
