<template>
  <div class="overflow-y-auto h-[500px] min-w-[600px] flex items-center justify-center relative">
    <transition-group tag="div" class="flex flex-col gap-4 w-full h-full" @enter="enter">
      <slot></slot>
    </transition-group>
    <div v-if="loading" class="w-[200px] absolute top-1/2.5 left-1/2.5">
      <Loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import Loading from "./Loading.vue";

const { loading } = defineProps<{ loading: boolean }>();

const enter = (el: Element) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: -50 },
    //@ts-expect-error
    { opacity: 1, x: 0, duration: 0.5, delay: Number(el.dataset.index) * 0.2 }
  );
};
</script>

<style lang="scss" scoped></style>
