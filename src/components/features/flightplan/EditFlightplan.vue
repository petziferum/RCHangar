<template>
<v-card>
  <v-card-title>
    <div>{{ datum.toLocaleDateString() }}</div>
    <div class="text-caption">{{ flugplanStore.flugplanEdit.id }}</div>
    <v-spacer />
    <v-btn color="red" variant="elevated" @click="deletePlan">
      <v-icon>mdi-delete-forever</v-icon>
    </v-btn>
  </v-card-title>
  <v-card-text>
    <v-form ref="flugplanform">
      <v-text-field v-model="flugplanStore.flugplanEdit.name" label="Name des Flugplans" />
      <v-textarea v-model="flugplanStore.flugplanEdit.freitext" label="Freitext" />
      <v-combobox
        label="Flugzeuge"
        :items="planeStore.planesList"
        chips
        item-title="name"
        item-value="id"
        multiple
        :return-object="false"
        v-model="flugplanStore.flugplanEdit.flugzeuge" />
    </v-form>
    <v-date-picker v-model="datum" @update:modelValue="setNewDate"/>
  </v-card-text>
  <v-card-actions>
    <v-spacer/>
    <v-btn color="red" variant="text" @click="close">Abbrechen</v-btn>
      <v-btn color="success" variant="elevated" @click="updateFlugplan">Speichern</v-btn>
  </v-card-actions>
</v-card>
</template>
<script setup lang="ts">
import { useFlugplanStore } from '@/stores/flugplanStore'
import { usePlaneStore } from '@/stores/planeStore'
import FlightPlan from '../../../types/FlightPlan'
import { ref } from 'vue'
import { Timestamp } from 'firebase/firestore'

const flugplanStore = useFlugplanStore()
const planeStore = usePlaneStore()
const datum = ref(new Date(flugplanStore.flugplanEdit.date.seconds * 1000))

function deletePlan() {
  flugplanStore.deleteFlightplan(flugplanStore.flugplanEdit.id)
}
function updateFlugplan() {
  flugplanStore.updateFlightplan()
}
function setNewDate() {
  flugplanStore.flugplanEdit.date = Timestamp.fromDate(datum.value);
}
function getDate() {
  return FlightPlan.getDate(flugplanStore.flugplanEdit.date)
}
function close() {
  flugplanStore.editMode = false;
}
</script>
<style scoped>

</style>