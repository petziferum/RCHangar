<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <v-spacer />
      <v-icon v-if="planeStore.hangarLoading" icon="mdi-loading mdi-spin" /> {{ planeStore.planesList.length }}
      <v-select
        v-model="planeStore.editPlane"
        return-object
        class="mt-5"
        label="Modell bearbeiten"
        :loading="planeStore.hangarLoading"
        :items="planeStore.getSortedPlanes"
        item-title="name"
      @update:modelValue="startEditing"/>
      <BaseDialog activator-text="Flugzeug erstellen" @create="createPlane" title="Name des Flugzeugs" ref="baseDialog" />
      <v-spacer />
      <v-btn variant="outlined" elevation="2" @click="createFlightPlan">
        <v-icon icon="mdi-airport" size="large"/>Neuer Flugplan
      </v-btn>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1">
        <v-icon icon="mdi-playlist-edit" size="x-large" />
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        Update Plane: {{ editPlane }}<br>
        {{ planeStore.editPlane }}
      </v-col>
      <v-col>
        <template v-if="editPlane">
          <the-edit-plane @save="saveEmit" @cancel="cancel"/>
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
import TheEditPlane from '@/components/TheEditPlane.vue'
import { toast } from 'vue3-toastify'
import FlightPlan from '@/types/FlightPlan'


const userStore = useUserStore();
const planeStore = usePlaneStore();
const newPlane = planeStore.editPlane;
const baseDialog = ref(null);
const editPlane = ref(false);
const hint = ref("");
const showRawData = ref(true);
const batteries = batteryAsRecord

//Todo: EditPlane Komponente verwenden!
//Todo: Battery als Dropdown auswahlfeld einfügen.

const flightPlan = ref<FlightPlan | null>(null);

function createFlightPlan() {
  const date = new Date();
  const remark = "This is a sample flight plan.";
  flightPlan.value = FlightPlan.createEmtptyFlugzeugliste().withId("1234").withDate(date).withName("Test").withFlugzeuge([newPlane]).withFreitext(remark);
}

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

  function saveEmit() {
    console.log("updatePlane", planeStore.editPlane);
    editPlane.value = false;
  }
  function cancel() {
    editPlane.value = false;
  }

</script>
<style scoped>

</style>
