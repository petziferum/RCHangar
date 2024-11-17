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
            <v-list-item v-for="(list, index) in flightPlans" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ list.date.toLocaleDateString() }} - {{ list.name }} id: {{list.id}}</v-list-item-title>
                <v-list-item-subtitle>{{ list.freitext }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ list.flugzeuge.length }} planes</v-list-item-subtitle>
              </v-list-item-content>
              <template v-slot:append>
                <v-icon @click="console.log(list)">mdi-format-list-text</v-icon>
                <v-icon @click="deletePlan(index)">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="visible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script lang="ts" setup>
  import { computed, ref } from 'vue'
    import FlightPlan from '@/types/FlightPlan';
    import { useFlugplanStore } from '@/stores/flugplanStore'

    const flugplanStore = useFlugplanStore();

    const visible = ref(false);
    const flightPlans = computed(() => flugplanStore.flugplaene);

    function deletePlan(index: number) {
      flugplanStore.flugplaene.splice(index, 1);
    }

    defineExpose({
      open: () => { visible.value = true },
      close: () => { visible.value = false }
    });
  </script>

<style scoped>
</style>