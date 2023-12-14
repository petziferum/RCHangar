import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'

export const usePlaneStore = defineStore('platneStore', () => {
  const planesList = ref<Plane[]>([])

  function loadAllPlanes() {
    console.log("loadAllPlanes");
    HangarService.getAllPlanes().then((res) => {
      console.log("getPlanes", res);
      planesList.value = res
    });
  }


  return { planesList, loadAllPlanes }
})