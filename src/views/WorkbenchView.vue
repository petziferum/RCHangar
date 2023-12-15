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
          <v-card title="Erstelle neues Modell" :subtitle="'Firebase-ID: ' + newPlane.id">
            <v-card-text>
              <v-form ref="editPlaneForm" @submit.prevent="saveNewPlane" >
                <v-text-field label="Name" v-model="newPlane.name" />
                <v-alert v-if="hint.length > 0" density="compact" border="start" variant="elevated" class="ma-2" type="warning">
                  <v-tooltip location="bottom">
                    <template #activator="{ props }">
                      <span v-bind="props">{{ hint }}</span>
                    </template>
                    <span>Die ID wird aus dem zuerst gegebenen Namen generiert. Wenn der Name hier geändert wird, bleibt die ID gleich.</span>
                  </v-tooltip>
                </v-alert>
                <v-checkbox label="crashed" v-model="newPlane.crash" />
                <v-spacer />
                <v-btn text="Speichern" type="submit" />
              </v-form>
            </v-card-text>
            <v-card-item>
              <v-btn variant="text" @click="showRawData = !showRawData"><v-icon size="x-large" start icon="mdi-code-block-braces" /> Raw Data</v-btn>
              <v-expansion-panels v-if="showRawData">
                <v-expansion-panel>
                  <v-card>
                    <v-card-text>
                      <pre>{{ newPlane }}</pre>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-item>
          </v-card>
        </template>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
import { ref, watch } from 'vue'
import Plane from '@/types/Plane'
import { useUserStore } from '@/stores/userStore'
import { slugifyString } from '@/plugins/scripts'
import { usePlaneStore } from '@/stores/planeStore'

const userStore = useUserStore();
const planeStore = usePlaneStore();
const newPlane = planeStore.newPlane;
const baseDialog = ref(null);
const editPlane = ref(false);
const hint = ref("");
const showRawData = ref(true);

watch(() => newPlane.name, (newVal) => {
  const nameSlug = slugifyString(newVal!);
  if (newPlane.id && nameSlug !== newPlane.id) {
    hint.value = `Achtung, der neue Name: "${newVal}" und ID: "${planeStore.newPlane.id}", weichen voneinander ab.`
  } else hint.value = "";
})
  function createPlane() {
    console.log("createPlane", newPlane.name);
    editPlane.value = true;
  }

  function saveNewPlane() {
    console.log("saveNewPlane", newPlane);
    planeStore.addNewPlane();
    editPlane.value = false;
  }

</script>
<style scoped>

</style>
