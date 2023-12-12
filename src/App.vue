<template>
  <main class="appMain">
  <RouterView />
  </main>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>
<style scoped>
.appMain {
  padding-top: 64px;
  background-color: #5a664b;
}
</style>
