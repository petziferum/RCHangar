<template>
  <v-card title="Modell bearbeiten" :subtitle="'Firebase-ID: ' + planeStore.editPlane.id">
    <v-card-subtitle v-if="allowSetOwner()" class="py-5">
      <v-btn @click="setOwner" variant="outlined">set me as Owner</v-btn>
    </v-card-subtitle>
    <v-img cover :src="planeStore.editPlane.image" height="400px" />
    <v-card-text class="my-5 bg-blue-accent-1">
      <v-btn
        v-for="(entry, index) in components"
        variant="outlined"
        elevation="2"
        :key="index"
        @click="setPhotoComponent(entry.component)"
      >{{ entry.text }}</v-btn
      >
    </v-card-text>
    <v-card-text>
      <component :is="currentComponent" />
      ImageSrc: {{ planeStore.editPlane.image }}
    </v-card-text>
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
          <v-btn color="red" @click="cancel" text="Abbrechen"></v-btn>
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
<script setup lang=ts>
import { usePlaneStore } from '@/stores/planeStore'
import { ref } from 'vue'
import { batteryAsRecord } from '@/types/Battery'
import photoSelectComponent from '@/components/photoSelectComponent.vue'
import ThePhotoUploadComponent from '@/components/ThePhotoUploadComponent.vue'
import { useUserStore } from '@/stores/userStore'

const emit = defineEmits(["cancel", "save"]);
const planeStore = usePlaneStore();
const userStore = useUserStore();
const hint = ref("");
const editPlane = ref(false);
const showRawData = ref(true);
const batteries = batteryAsRecord
const currentComponent = ref(null);
const components = [
  { text: "Select Photo", component: photoSelectComponent },
  { text: "Upload new Photo", component: ThePhotoUploadComponent },
];
function allowSetOwner() {
  const hasCriticalData = userStore.appUser && planeStore.editPlane;
  const isAdmin = userStore.appUser.isAdmin;
  const noOwnerOrCurrentUserIsNotOwner = !planeStore.editPlane?.owner || planeStore.editPlane.owner.id !== userStore.appUser.id;

  return isAdmin && hasCriticalData && noOwnerOrCurrentUserIsNotOwner;
}


function setOwner() {
  planeStore.setOwnerToEditPlane();
}
function updatePlane() {
  planeStore.updateEditedPlane();
  editPlane.value = false;
  emit("save")
}
function cancel() {
  emit("cancel");
}
function setPhotoComponent(component: any): void {
  console.log("setPhotoComponent", component)
  currentComponent.value = component;
}
</script>
<style scoped>

</style>