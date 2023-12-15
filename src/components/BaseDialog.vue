<template>
<v-dialog v-model="isOpen" width="50%">
  <template v-slot:activator="{ props }">
    <v-btn variant="outlined" prepend-icon="mdi-airplane" v-bind="props" @click="isOpen = true">{{activatorText}}</v-btn>
  </template>
  <v-card :title="title">
    <v-form ref="createPlaneForm" @submit.prevent="createPlane">
      <v-card-text>
        <v-alert density="compact" border="start" variant="elevated" elevation="12" class="mb-5" type="info">
          <strong>Achtung!</strong> Name wird die Id des Fliegers. Wenn der Name später geändert wird, bleibt die ID gleich.
        </v-alert>
        <v-text-field
          label="Name des Flugzeugs"
          autofocus
          variant="outlined"
          :rules="filledRule"
          v-model="planeStore.newPlane.name"
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
import { usePlaneStore } from '@/stores/planeStore'
import { slugifyString } from '@/plugins/scripts'

const props = defineProps(["activatorText","title"]);
const emit = defineEmits(["create"]);
const filledRule = ref([(v) => v != null || "Name muss ausgefüllt sein"]);
const isOpen = ref(false);
const planeStore = usePlaneStore();
function createPlane() {
  planeStore.newPlane.id = slugifyString(planeStore.newPlane.name!);
  emit("create");
  closeDialog();
}
function closeDialog() {
  isOpen.value = false;
}
</script>
<style scoped>

</style>