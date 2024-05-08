import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'
import { toast } from 'vue3-toastify'

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
      hangarLoading.value = false;
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
    hangarLoading.value = true;
    HangarService.updatePlane(editPlane.value);
      resetNewPlane();
      toast("Aktualisierung durchgeführt: " + editPlane.value.name);
      hangarLoading.value = false
  }
  function resetNewPlane(): void {
    newPlane.value = Plane.createEmptyPlane().withCrash(false);
  }
  function updateImage(image: string) {
    console.log("update image", image);
    console.log("editRecipe", editPlane.value);
    editPlane.value.image = image;
  }

  const getPlanesAsList = computed(() => {
    const sortedPlanes = planesList.value.slice().sort((a, b) => a.name.localeCompare(b.name));
    const listOfPlaneNames = sortedPlanes.map(obj => obj.name);

    return listOfPlaneNames;
  });
  const getSortedPlanes = computed(() => {
    return planesList.value.slice().sort((a, b) => a.name.localeCompare(b.name));
  })

  return { planesList,hangarLoading, newPlane, editPlane, saveNewPlane, loadAllPlanes, updateEditedPlane, updateImage, getPlanesAsList, getSortedPlanes }
})
