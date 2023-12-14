<template>
  <v-row>
    <v-col cols="12" md="6" lg="3">
      <v-select
        prefix="Sortieren nach:    "
        dark
        filled
        :items="orderList"
        v-model="orderBy"
        @input="getByOrder"
      ></v-select>
      <div class="white--text">Flugzeuge: {{ planeStore.planesList.length }}</div>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePlaneStore } from '@/stores/planeStore'
const planeStore = usePlaneStore()
const orderList = ref(["name", "id", "faktor", "gewicht", "spannweite"])
const orderBy = ref("name")
const getByOrder = computed(() => {
  return planeStore.planesList.sort((a, b) => {
    if (a[orderBy.value] < b[orderBy.value]) {
      return -1
    }
    if (a[orderBy.value] > b[orderBy.value]) {
      return 1
    }
    return 0
  })
})
</script>
<style scopedts>

</style>