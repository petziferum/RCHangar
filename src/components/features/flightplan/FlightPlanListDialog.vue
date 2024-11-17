<template>
  <v-dialog v-model="visible" width="600">
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="attrs" v-on="on"></slot>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Flight Plans</span>
      </v-card-title>
      <v-card-text>
        <v-slide-x-transition mode="out-in">
        <template v-if="flugplanStore.loading">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </template>
        <template v-else>
          <v-list lines="two">
            <v-list-item v-for="(list, index) in flightPlans" :key="index" @click="editPlan(index)">
              <v-list-item-title>{{ list.name }} id: {{ list.id }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ getDate(list.date) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>{{ list.freitext }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ list.flugzeuge.length }} planes</v-list-item-subtitle>
              <template v-slot:append>
                <v-icon>mdi-format-list-text</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </template>
        </v-slide-x-transition>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useFlugplanStore } from '@/stores/flugplanStore'
import { usePlaneStore } from '@/stores/planeStore'

const flugplanStore = useFlugplanStore()
const planeStore = usePlaneStore()
const visible = ref(false)
const flightPlans = computed(() => flugplanStore.flugplaene)
function getDate(timestamp) {
 const seconds = timestamp.seconds;
 return new Date(seconds * 1000).toLocaleDateString();
}

function editPlan(index: number) {
  flugplanStore.flugplanEdit = flugplanStore.flugplaene[index];
  flugplanStore.editMode = true;
  planeStore.editMode = false;
  close();
}

function open() {
  flugplanStore.fetchFlightplans();
  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({ open, close })
</script>

<style scoped>
</style>