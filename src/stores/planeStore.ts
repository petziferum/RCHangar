import { defineStore } from 'pinia'
import { ref } from 'vue'
import Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'

export const usePlaneStore = defineStore('planeStore', () => {
  const planesList = ref<Plane[]>([])
  const hangarLoading = ref(false)
  const newPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))
  const editPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))

  function loadAllPlanes() {
    console.log("loadAllPlanes gestartet");
    hangarLoading.value = true;
    HangarService.getAllPlanes().then((res) => {
      console.log("getPlanes", res);
      planesList.value = res
    }).then(() => {
      hangarLoading.value = false
    });
  }

  function saveNewPlane(): void {
    hangarLoading.value = true;
    HangarService.saveNewPlane(newPlane.value).then((res) => {
      editPlane.value = Object.assign({}, res);
      resetNewPlane();
      loadAllPlanes();
    }).catch(error => {
      console.log("Fehler beim Speichern", error);
    }).finally(() => hangarLoading.value = false);
  }

  function updateEditedPlane(): void {
    HangarService.updatePlane(newPlane.value.id!, newPlane.value).then((res) => {
      resetNewPlane();
      loadAllPlanes();
    });

  }

  function resetNewPlane(): void {
    newPlane.value = Plane.createEmptyPlane().withCrash(false);
  }

  function getPlanesAsList(): (string | undefined)[] {
    return planesList.value.map(obj => obj.name);
  }

  return { planesList,hangarLoading, newPlane, editPlane, saveNewPlane, loadAllPlanes, updateEditedPlane, getPlanesAsList }
})
