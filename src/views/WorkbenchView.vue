<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <v-spacer />
      <BaseDialog activator-text="Flugzeug erstellen" @create="createPlane" title="Name des Flugzeugs" ref="baseDialog" />
      <v-spacer></v-spacer>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1">
        <v-icon icon="mdi-information-outline" />
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <template v-if="editPlane">
          <v-card title="Erstelle neues Modell" :subtitle="newPlane.id">
              <v-form ref="editPlaneForm" >
                <v-text-field label="Name" :value="newPlane.name" />
              </v-form>
          </v-card>
        </template>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
import { ref } from 'vue'
import Plane from '@/types/Plane'
import { useUserStore } from '@/stores/userStore'
import { slugifyString } from '@/plugins/scripts'

const userStore = useUserStore();
const newPlane = ref(Plane.createEmptyPlane());
const baseDialog = ref(null);
const editPlane = ref(false);

function createPlane(name: string) {
  console.log("createPlane", name);
  editPlane.value = true;
  newPlane.value.id = slugifyString(name);
  newPlane.value.name = name;
}
</script>
<style scoped>

</style>
