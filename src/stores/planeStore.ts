import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'

export const usePlaneStore = defineStore('platneStore', () => {
  const planesList = ref<Plane[]>([])
  const hangarLoading = ref(false)

  function loadAllPlanes() {
    console.log("loadAllPlanes");
    hangarLoading.value = true;
    HangarService.getAllPlanes().then((res) => {
      console.log("getPlanes", res);
      planesList.value = res
    }).finally(() => {
      setTimeout(() => (hangarLoading.value = false), 3000);
    });
  }


  return { planesList,hangarLoading, loadAllPlanes }
})