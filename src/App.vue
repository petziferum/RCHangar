<template>
  <v-app>
    <app-bar />
  <v-main class="appMain">
  <RouterView />
  </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppBar from '../src/components/common/AppBar.vue'

</script>
<style scoped>
.appMain {
  padding-top: 64px;
  background-color: #5a664b;
  border: 0px solid #00664b;
  border-radius: 10px;
  height: 100%;
  width: 100%;
}
</style>
