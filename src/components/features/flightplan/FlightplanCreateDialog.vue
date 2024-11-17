<template>
  <v-dialog v-model="open" width="40%" persistent>
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="attrs" v-on="on" />
    </template>
    <v-card>
      <v-card-title>
        Neuen Flugplan erstellen für: {{ flugplanStore.flugplanEdit.date.toLocaleDateString() }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="flugplanStore.flugplanEdit.name" label="Name des Flugplans" />
        <v-textarea v-model="flugplanStore.flugplanEdit.freitext" label="Freitext" />
        <v-combobox
          :items="planeStore.planesList"
          chips
          item-title="name"
          item-value="id"
          multiple
          :return-object="false"
          v-model="flugplanStore.flugplanEdit.flugzeuge"
        ></v-combobox>
        <v-date-picker v-model="flugplanStore.flugplanEdit.date" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="open = false">Abbrechen</v-btn>
        <v-btn @click="saveNewFlightPlan">Erstellen</v-btn>
      </v-card-actions>
      <v-card-text>
        {{ flugplanStore.flugplanEdit }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang=ts>
import { ref } from 'vue'
import { useFlugplanStore } from '@/stores/flugplanStore'
import { toast } from 'vue3-toastify'
import { usePlaneStore } from '@/stores/planeStore'

const flugplanStore = useFlugplanStore()
const planeStore = usePlaneStore()
const open = ref(false)
const selectedDate = ref(new Date())

const saveNewFlightPlan = () => {
  toast.info('Neuer Flugplan wird erstellt für: ' + flugplanStore.flugplanEdit.date.toLocaleDateString())
  flugplanStore.addNewFlugplan()
  open.value = false
}
defineExpose({
  open: () => {
    open.value = true
    flugplanStore.startEditFlightPlan()
  },
  close: () => {
    open.value = false
  }
})
</script>
<style scoped>

</style>