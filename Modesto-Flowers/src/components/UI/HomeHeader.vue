<template>
  <header>
    <div class="image-container">
      <img src="../../assets/logo.svg" alt="Logo" />
    </div>
    <nav>
      <a href="#" class="link">Home</a>
      <a href="#" class="link">Catalog</a>
      <a href="#" class="link">Tenders</a>
      <a href="#" class="link">Trade</a>
      <a href="#" class="link">Web-Shop NL</a>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style scoped lang="scss">
header {
  background: #9a9c72;
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 0.5rem 10rem;

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.link {
  text-decoration: none;
  font-size: 1rem;
  color: #000;
  font-weight: bold;
}
</style>
