import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'
import { toast } from 'vue3-toastify'
import LogEntry from '@/types/LogEntry'
import { useUserStore } from '@/stores/userStore'

export const usePlaneStore = defineStore('planeStore', () => {
  const planesList = ref<Plane[]>([])
  const hangarLoading = ref(false)
  const newPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))
  const editPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))
  const images = ref<string[]>([])

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
    editPlane.value.withUpdatedAt(new Date(Date.now()));
    editPlane.value.addLogEntry(LogEntry.createEmtptyLogEntry().withPlaneId(editPlane.value.id).withDate(new Date(Date.now())).withText("Änderung durchgeführt"));
    HangarService.updatePlane(editPlane.value);
      resetNewPlane();
      toast("Aktualisierung durchgeführt: " + editPlane.value.name);
      hangarLoading.value = false
  }
  function resetNewPlane(): void {
    newPlane.value = Plane.createEmptyPlane().withCrash(false);
  }
  function updateImage(image: string) {
    console.log("update image", image, " for Plane: ", editPlane.value.name);
    editPlane.value.image = image;
    updateEditedPlane();
    hangarLoading.value = false;
  }
  function fetchAllImages() {
    if(images.value.length > 0) return;
    else {
    HangarService.getAllImages()
      .then((res) => {
        images.value = res;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  function setOwnerToEditPlane() {
    editPlane.value.owner = useUserStore().appUser;
    updateEditedPlane();
  }

  const getPlanesAsList = computed(() => {
    const sortedPlanes = planesList.value.slice().sort((a, b) => a.name.localeCompare(b.name));
    const listOfPlaneNames = sortedPlanes.map(obj => obj.name);

    return listOfPlaneNames;
  });
  const getSortedPlanes = computed(() => {
    return planesList.value.slice().sort((a, b) => a.name.localeCompare(b.name));
  })
  const getAllImages = computed(() => {
    return images.value;
  })

  return { planesList,hangarLoading, newPlane, editPlane, images, saveNewPlane, loadAllPlanes, updateEditedPlane, updateImage, fetchAllImages, setOwnerToEditPlane, getPlanesAsList, getSortedPlanes, getAllImages, resetNewPlane}
})
