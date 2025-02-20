<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <template v-if="display.mdAndUp">
        <v-icon v-if="planeStore.hangarLoading" icon="mdi-loading mdi-spin" />
        {{ planeStore.planesList.length }}
        <v-select
          v-model="planeStore.editPlane"
          return-object
          class="mt-5"
          label="Modell bearbeiten"
          :loading="planeStore.hangarLoading"
          :items="planeStore.getSortedPlanes"
          item-title="name"
          @update:modelValue="startEditing" />
        <CreateNewPlaneDialog activator-text="Flugzeug erstellen" @create="createPlane" title="Name des Flugzeugs"
                    ref="baseDialog" />
        <v-spacer />
        <v-btn variant="outlined" elevation="2" @click="openCreateDialog" class="my-2">
          <v-icon icon="mdi-airport" size="large" />
          Neuer Flugplan
        </v-btn>
        <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1 my-2" @click="showFlightPlans">
          <v-icon icon="mdi-playlist-edit" size="x-large" />
        </v-btn>
      </template>
      <!-- Mobile: Menü statt Buttons und Felder -->
      <template v-else>
        <v-menu close-on-content-click v-model="menuOpen">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon icon="mdi-menu" />
            </v-btn>
          </template>
            <v-list>
              <v-list-item>
                <v-icon icon="mdi-loading mdi-spin" v-if="planeStore.hangarLoading" />
                Flugzeuge: {{ planeStore.planesList.length }}
              </v-list-item>
              <v-list-item @click="openCreateDialog">
                <v-icon icon="mdi-airport" class="me-2" />
                Neuer Flugplan
              </v-list-item>
              <v-list-item @click="showFlightPlans">
                <v-icon icon="mdi-playlist-edit" class="me-2" />
                Flugpläne anzeigen
              </v-list-item>
              <v-list-item>
                <v-dialog v-model="selectPlaneDialog">
                  <template #activator="{ props: activatorProps }">
                    <v-list-item-title v-bind="activatorProps">
                      <v-btn flat icon="mdi-airplane-takeoff" class="me-2" @click="menuOpen=false" />
                      Flugzeug bearbeiten
                    </v-list-item-title>
                  </template>
                    <v-card>
                      <v-card-text>
                        <v-select
                          v-model="planeStore.editPlane"
                          return-object
                          label="Modell bearbeiten"
                          :loading="planeStore.hangarLoading"
                          :items="planeStore.getSortedPlanes"
                          item-title="name"
                          @update:modelValue="startEditing"
                        />
                      </v-card-text>
                    </v-card>
                </v-dialog>
              </v-list-item>
              <v-list-item>
                <BaseDialog activator-text="Flugzeug erstellen" @create="createPlane" title="Name des Flugzeugs"
                            ref="baseDialog" />
              </v-list-item>
            </v-list>
        </v-menu>
      </template>
    </v-toolbar>
    <v-row>
      <v-col>
        {{ newPlane.name }} - {{ planeStore.editPlane.name }}
        <template v-if="editPlane">
          <the-edit-plane @save="saveEmit" @cancel="cancel" />
        </template>
        <template v-if="flugplanStore.editMode">
          <EditFlightplan />
        </template>
      </v-col>
    </v-row>
    <FlightplanCreateDialog ref="flightplanCreateDialog" />
    <FlightPlansDialog ref="flightPlansDialog" />
  </v-container>
</template>

<script setup lang="ts">
import CreateNewPlaneDialog from '@/components/CreateNewPlaneDialog.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { slugifyString } from '@/plugins/scripts'
import { usePlaneStore } from '@/stores/planeStore'
import { batteryAsRecord } from '@/types/Battery'
import TheEditPlane from '@/components/TheEditPlane.vue'
import FlightPlansDialog from '@/components/features/flightplan/FlightPlanListDialog.vue'
import FlightplanCreateDialog from '@/components/features/flightplan/FlightplanCreateDialog.vue'
import { useFlugplanStore } from '@/stores/flugplanStore'
import EditFlightplan from '@/components/features/flightplan/EditFlightplan.vue'
import { useDisplay } from 'vuetify'


const userStore = useUserStore()
const planeStore = usePlaneStore()
const flugplanStore = useFlugplanStore()
const newPlane = planeStore.newPlane
const baseDialog = ref(null)
const editPlane = computed<boolean>(()=> planeStore.editMode)
const hint = ref('')
const showRawData = ref(true)
const batteries = batteryAsRecord
const selectPlaneDialog = ref(false)
const menuOpen = ref(false)
const display = useDisplay();

//Todo: EditPlane Komponente verwenden!
//Todo: Battery als Dropdown auswahlfeld einfügen.
//Todo: Flightplans Kompionente ausbauen dass neuer Flugplan erstellt werden kann mit Flugzeugen und Flugdaten.
//Todo: Flightplans in DB speichern und laden zum Editieren.

const flightPlansDialog = ref<InstanceType<typeof FlightPlansDialog> | null>(null)
const flightplanCreateDialog = ref<InstanceType<typeof FlightplanCreateDialog> | null>(null)

function showFlightPlans() {
  flightPlansDialog.value?.open()
}

function openCreateDialog() {
  flightplanCreateDialog.value?.open()
}

watch(() => newPlane!.name, (newVal) => {
  const nameSlug = slugifyString(newVal!)
  if (newPlane.id && nameSlug !== newPlane.id) {
    hint.value = `Achtung, der neue Name: "${newVal}" und ID: "${planeStore.newPlane.id}", weichen voneinander ab.`
  } else hint.value = ''
})

onBeforeMount(() => {
  loadPlanes()
})

function startEditing(): void {
  selectPlaneDialog.value = false
  menuOpen.value = false
  planeStore.editMode = true;
  flugplanStore.editMode = false;
}

function loadPlanes(): void {
  if (planeStore.planesList.length === 0) planeStore.loadAllPlanes()
}

function createPlane() {
  console.log('createPlane', newPlane.name)
  planeStore.saveNewPlane()
  planeStore.editMode = true;
}

function saveEmit() {
  console.log('updatePlane saveemit', planeStore.editPlane)
  planeStore.editMode = false;
}

function cancel() {
  planeStore.editMode = false
}

</script>
<style scoped>

</style>
