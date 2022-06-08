<template>
  <div class="tags-container" :class="{ left: alignment == 'left' }">
    <div v-for="tag in tags" :key="Math.random()" class="tag">
      <v-chip color="primary" variant="outlined" label>
        <v-icon v-if="tag.icon" start>{{ tag.icon }}</v-icon>
        <figure>{{ tag.text }}</figure>
      </v-chip>
      <v-icon v-if="showDivider" small class="divider">mdi-arrow-right</v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  text: string;
  icon: null | string;
}

const {
  alignment = "width",
  tags,
  showDivider = false,
} = defineProps<{
  alignment?: "left" | "width";
  tags: Tag[];
  showDivider: boolean;
}>();
</script>

<style scoped lang="scss">
.tags-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid rgb(51, 50, 50);
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: rgb(243, 243, 243);

  &.left {
    align-items: flex-start;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0.1rem;

    .divider {
      font-size: 18px;
    }

    &:last-child {
      .divider {
        display: none;
      }
    }
  }
}
</style>
