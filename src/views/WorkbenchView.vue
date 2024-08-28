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
      <v-btn variant="outlined" elevation="2" @click="openCreateDialog">
        <v-icon icon="mdi-airport" size="large"/>Neuer Flugplan
      </v-btn>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1" @click="showFlightPlans">
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
    <FlightplanCreateDialog ref="flightplanCreateDialog" @create="createFlightPlan" />
    <FlightPlansDialog ref="flightPlansDialog" :flightPlans="flightPlans" />
  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { slugifyString } from '@/plugins/scripts'
import { usePlaneStore } from '@/stores/planeStore'
import { batteryAsRecord } from '@/types/Battery'
import TheEditPlane from '@/components/TheEditPlane.vue'
import { toast } from 'vue3-toastify'
import FlightPlan from '@/types/FlightPlan'
import FlightPlansDialog from '@/components/FlightPlanListDialog.vue'
import FlightplanCreateDialog from '@/components/FlightplanCreateDialog.vue'


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
//Todo: Flightplans Kompionente ausbauen dass neuer Flugplan erstellt werden kann mit Flugzeugen und Flugdaten.
//Todo: Flightplans in DB speichern und laden zum Editieren.

const flightPlanEdit = ref<FlightPlan | null>(null);
const flightPlans = ref<FlightPlan[]>([]);
const flightPlansDialog = ref<InstanceType<typeof FlightPlansDialog> | null>(null);
const flightplanCreateDialog = ref<InstanceType<typeof FlightplanCreateDialog> | null>(null);

function showFlightPlans() {
  flightPlansDialog.value?.open();
}
function openCreateDialog() {
  flightplanCreateDialog.value?.open();
}
function createFlightPlan(payload: Date) {
  toast.info("Neuer Flugplan wird erstellt für" + payload);
  const date = payload;
  const remark = "This is a sample flight plan.";
  const randomId = Math.floor(Math.random() * (9999 - 1000) + 1000);
  flightPlanEdit.value = FlightPlan.createEmtptyFlugzeugliste().withId(randomId.toString()).withDate(date).withName("Test").withFlugzeuge([newPlane]).withFreitext(remark);
  flightPlans.value.push(flightPlanEdit.value);

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
    console.log("updatePlane saveemit", planeStore.editPlane);
    editPlane.value = false;
  }
  function cancel() {
    editPlane.value = false;
  }

</script>
<style scoped>

</style>
