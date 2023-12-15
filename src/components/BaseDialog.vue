<template>
<v-dialog v-model="isOpen">
  <template v-slot:activator="{ props }">
    <v-btn variant="outlined" prepend-icon="mdi-airplane" v-bind="props" @click="isOpen = true">{{activatorText}}</v-btn>
  </template>
  <v-card :title="title">
    <v-form ref="createPlaneForm" @submit.prevent="createPlane">
      <v-card-text>
        <v-text-field
          label="Name des Flugzeugs"
          :rules="filledRule"
          v-model="name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" color="red" @click="closeDialog">abbrechen</v-btn>
        <v-btn variant="text" color="green" type="submit">weiter</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-dialog>
</template>
<script setup lang=ts>
import { ref } from 'vue'

const props = defineProps(["activatorText","title"]);
const emit = defineEmits(["create"]);
const filledRule = ref([(v) => v != null || "Name muss ausgefüllt sein"]);
const isOpen = ref(false);
const name = ref("");
function createPlane() {
  emit("create", name.value);
  closeDialog();
}
function closeDialog() {
  isOpen.value = false;
}
</script>
<style scoped>

</style>