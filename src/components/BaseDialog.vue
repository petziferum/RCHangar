<template>
<v-dialog v-model="isOpen">
  <template v-slot:activator="{ props }">
    <v-btn variant="outlined" prepend-icon="mdi-airplane" v-bind="props" @click="emitEvent">{{activatorText}}</v-btn>
  </template>
  <v-card :title="title">
    <slot></slot>
  </v-card>
</v-dialog>
</template>
<script setup lang=ts>
import { ref } from 'vue'

const props = defineProps(["activatorText","title"]);
const isOpen = ref(false);
function emitEvent() {
  console.log("emitEvent");
}
</script>
<style scoped>

</style>