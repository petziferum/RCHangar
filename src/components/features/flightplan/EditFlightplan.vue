<template>
<v-card>
  <v-card-title>
    {{ flugplanStore.flugplanEdit.date }} - {{ flugplanStore.flugplanEdit.id }}
    <v-spacer />
    <v-btn @click="deletePlan">
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
  </v-card-text>
</v-card>
</template>
<script setup lang="ts">
import { useFlugplanStore } from '@/stores/flugplanStore'
import { usePlaneStore } from '@/stores/planeStore'

const flugplanStore = useFlugplanStore()
const planeStore = usePlaneStore()

function deletePlan() {
  flugplanStore.deleteFlightplan(flugplanStore.flugplanEdit.id)
}
</script>
<style scoped>

</style>