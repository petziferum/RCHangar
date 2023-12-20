import { defineStore } from 'pinia'
import { ref } from 'vue'
import Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'

export const usePlaneStore = defineStore('planeStore', () => {
  const planesList = ref<Plane[]>([])
  const hangarLoading = ref(false)
  const newPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))

  function loadAllPlanes() {
    console.log("loadAllPlanes");
    hangarLoading.value = true;
    HangarService.getAllPlanes().then((res) => {
      console.log("getPlanes", res);
      planesList.value = res
    }).finally(() => {
      setTimeout(() => (hangarLoading.value = false), 300);
    });
  }

  function addNewPlane(): void {
    planesList.value.push(newPlane.value);
    resetNewPlane();
  }

  function resetNewPlane(): void {
    newPlane.value = Plane.createEmptyPlane().withCrash(false);
  }

  return { planesList,hangarLoading, newPlane, loadAllPlanes, addNewPlane }
})
