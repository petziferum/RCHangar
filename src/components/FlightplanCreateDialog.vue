<template>
<v-dialog v-model="open" width="40%" persistent>
  <template v-slot:activator="{ on, attrs }">
    <slot v-bind="attrs" v-on="on" />
  </template>
  <v-card title="Neuen Flugplan erstellen">
    <v-card-text>
      //Hier soll ein Feld rein um das Datum auszuwählen für den Flugplan

    </v-card-text>
    <v-card-actions>
      <v-btn @click="open = false">Abbrechen</v-btn>
      <v-btn @click="saveNewFlightPlan">Erstellen</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script setup lang=ts>
import { ref } from 'vue'

const emit = defineEmits({
  create: (date: Date) => (console.log(date))
})

const open = ref(false);
const selectedDate = ref(new Date());

const saveNewFlightPlan = () => {
  emit('create', selectedDate.value)
  open.value = false
}
defineExpose({
  open: () => { open.value = true },
  close: () => { open.value = false }
});
</script>
<style scoped>

</style>