<template>
  <v-row class="mt-10">
    <v-col cols="12" md="6" lg="3">
      <v-select
        prefix="Sortieren nach:    "
        dark
        filled
        :items="orderList"
        v-model="orderBy"
        @input="getByOrder"
      ></v-select>
      <div class="mx-5 text-white">Flugzeuge: {{ planeStore.planesList.length }}</div>
    </v-col>
  </v-row>
  <v-row>
    <v-icon v-if="planeStore.hangarLoading" class="mx-5" icon="mdi-knob mdi-spin" color="grey" />
  </v-row>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { usePlaneStore } from '@/stores/planeStore'
const planeStore = usePlaneStore()
const orderList = ref(["name", "id", "faktor", "gewicht", "spannweite"])
const orderBy = ref("name")
function getByOrder() {
  console.info("order by", orderBy.value);
  getPlanes();
};

function getPlanes() {
  planeStore.loadAllPlanes();
}
onBeforeMount(() => {
  getPlanes();
});
</script>
<style scopedts>

</style>