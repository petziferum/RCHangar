<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <v-spacer />
      <v-icon v-if="planeStore.hangarLoading" icon="mdi-loading mdi-spin" /> {{ planeStore.planesList.length }}
      <v-select
        v-model="planeStore.editPlane"
        return-object class="mt-5"
        label="Modell bearbeiten"
        :loading="planeStore.hangarLoading"
        :items="planeStore.planesList"
        item-title="name"
      @update:focused="startEditing"/>
      <BaseDialog activator-text="Flugzeug erstellen" @create="createPlane" title="Name des Flugzeugs" ref="baseDialog" />
      <v-spacer></v-spacer>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1">
        <v-icon icon="mdi-information-outline" />
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        Update Plane: {{ editPlane }}<br>
        {{ planeStore.editPlane }}
      </v-col>
      <v-col>
        <template v-if="editPlane">
          <v-card title="Modell bearbeiten" :subtitle="'Firebase-ID: ' + planeStore.editPlane.id">
              <v-img cover :src="planeStore.editPlane.image" height="400px" />
            <v-card-text>
              <v-form ref="editPlaneForm" @submit.prevent="updatePlane" >
                <v-text-field label="Name" v-model="planeStore.editPlane.name" />
                <v-alert v-if="hint.length > 0" density="compact" border="start" variant="elevated" class="ma-2" type="warning">
                  <v-tooltip location="bottom">
                    <template #activator="{ props }">
                      <span v-bind="props">{{ hint }}</span>
                    </template>
                    <span>Die ID wird aus dem zuerst gegebenen Namen generiert. Wenn der Name hier geändert wird, bleibt die ID gleich.</span>
                  </v-tooltip>
                </v-alert>
                <v-row>
                  <v-col cols="2" style="background-image: linear-gradient(45deg, rgb(255,0,141), rgb(28,28,251)); border-radius: 10pt; color: #fff">
                    <v-checkbox color="white" label="crashed" v-model="planeStore.editPlane.crash" />
                  </v-col>
                  <v-col>
                    <v-text-field label="Beschreibung" v-model="planeStore.editPlane.beschreibung" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><v-text-field label="type" v-model="planeStore.editPlane.type" /></v-col>
                  <v-col><v-text-field label="Bauweise" v-model="planeStore.editPlane.bauweise" /></v-col>
                  <v-col><v-text-field label="Spannweite" v-model="planeStore.editPlane.spannweite" /></v-col>
                </v-row>
                <v-row>
                  <v-col><v-text-field label="gewicht" v-model="planeStore.editPlane.gewicht" /></v-col>
                  <v-col><v-text-field label="faktor" v-model="planeStore.editPlane.faktor" /></v-col>
                  <v-col><v-select :items="batteries" item-title="text" label="Akku" v-model="planeStore.editPlane.battery" />
                  </v-col>
                  <v-col><v-text-field label="MaH" v-model="planeStore.editPlane.mah" /></v-col>
                </v-row>

                <div width="100%" class="text-right">
                  <v-btn color="red" @click="editPlane = false" text="Abbrechen"></v-btn>
                  <v-btn color="success" text="Speichern" type="submit" />
                </div>
              </v-form>
            </v-card-text>
            <v-card-item>
              <v-btn variant="text" @click="showRawData = !showRawData"><v-icon size="x-large" start icon="mdi-code-block-braces" /> Raw Data</v-btn>
              <v-expansion-panels v-if="showRawData">
                <v-expansion-panel>
                  <v-card>
                    <v-card-text>
                      <pre>{{ planeStore.editPlane }}</pre>
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
import { computed, onBeforeMount, ref, watch } from 'vue'
import Plane from '@/types/Plane'
import { useUserStore } from '@/stores/userStore'
import { slugifyString } from '@/plugins/scripts'
import { usePlaneStore } from '@/stores/planeStore'
import { batteryAsRecord } from '@/types/Battery'


const userStore = useUserStore();
const planeStore = usePlaneStore();
const newPlane = planeStore.editPlane;
const baseDialog = ref(null);
const editPlane = ref(false);
const hint = ref("");
const showRawData = ref(true);
const batteries = batteryAsRecord

//Todo: Battery als Dropdown auswahlfeld einfügen.


watch(() => newPlane!.name, (newVal) => {
  const nameSlug = slugifyString(newVal!);
  if (newPlane.id && nameSlug !== newPlane.id) {
    hint.value = `Achtung, der neue Name: "${newVal}" und ID: "${planeStore.newPlane.id}", weichen voneinander ab.`
  } else hint.value = "";
})

onBeforeMount(()=> {
  loadPlanes();
});
function startEditing(): void {
  editPlane.value = true;
}
function loadPlanes(): void {
  if(planeStore.planesList.length === 0) planeStore.loadAllPlanes();
}
  function createPlane() {
    console.log("createPlane", newPlane.name);
    planeStore.saveNewPlane();
    editPlane.value = true;
  }

  function updatePlane() {
    console.log("updatePlane", planeStore.editPlane);
    planeStore.updateEditedPlane();
    editPlane.value = false;
  }

</script>
<style scoped>

</style>
