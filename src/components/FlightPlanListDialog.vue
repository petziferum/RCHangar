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
          <v-list lines="two">
            <v-list-item v-for="(plane, index) in flightPlans" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ plane.date.toLocaleDateString() }} - {{ plane.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ plane.freitext }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ plane.flugzeuge.length }} planes</v-list-item-subtitle>
              </v-list-item-content>
              <template v-slot:append>
                <v-icon @click="console.log(plane)">mdi-format-list-text</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="visible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script lang="ts" setup>
    import { ref } from 'vue';
    import FlightPlan from '@/types/FlightPlan';

    const props = defineProps<{
      flightPlans: FlightPlan[]
    }>();

    const visible = ref(false);

    defineExpose({
      open: () => { visible.value = true },
      close: () => { visible.value = false }
    });
  </script>

<style scoped>
</style>