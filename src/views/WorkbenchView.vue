<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <v-spacer />
      <BaseDialog activator-text="Flugzeug erstellen" title="Name des Flugzeugs" ref="baseDialog">
        <v-form ref="createPlaneForm" @submit.prevent="createPlane">
          <v-card-text>
            <v-text-field
              label="Name des Flugzeugs"
              :rules="filledRule"
              v-model="newPlane.name"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" color="red" @click="closeDialog = false">abbrechen</v-btn>
            <v-btn variant="text" color="green" type="submit">weiter</v-btn>
          </v-card-actions>
        </v-form>
      </BaseDialog>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1">
        <v-icon icon="mdi-information-outline" />
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>

      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
import { ref } from 'vue'
import Plane from '@/types/Plane'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore();
const filledRule = ref([(v) => v != null || "Name muss ausgefüllt sein"]);
const newPlane = ref(Plane.createEmptyPlane());
const baseDialog = ref(null);

function createPlane() {

}

function closeDialog() {
  baseDialog.value.isOpen = false;
}
</script>
<style scoped>

</style>
