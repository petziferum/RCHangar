import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Plane from '@/types/Plane'
import HangarService from '@/api/hangarService.api'
import { toast } from 'vue3-toastify'
import LogEntry from '@/types/LogEntry'
import { useUserStore } from '@/stores/userStore'
import { serverTimestamp } from 'firebase/firestore'

export const usePlaneStore = defineStore('planeStore', () => {
  const planesList = ref<Plane[]>([])
  const hangarLoading = ref(false)
  const newPlane = ref<Plane>(Plane.createEmptyPlane().withOwner(useUserStore().appUser).withCrash(false))
  const editPlane = ref<Plane>(Plane.createEmptyPlane().withCrash(false))
  const images = ref<string[]>([])
  const editMode = ref(false);

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

    if(useUserStore().appUser.id) {
      newPlane.value.owner = useUserStore().appUser;
      console.log("create Plane with Owner: ", newPlane.value.owner.id);
      HangarService.saveNewPlane(newPlane.value).then((res) => {
        newPlane.value = Object.assign({}, res);
        //resetNewPlane();
        loadAllPlanes();
      }).catch(error => {
        console.log(error);
      }).finally(() => hangarLoading.value = false);
    } else {
      console.log("kein User gefunden", useUserStore().appUser.id);
      hangarLoading.value = false;
    }
  }
  function updateEditedPlane(): void {
    hangarLoading.value = true;
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

  return { planesList,hangarLoading, newPlane, editPlane, images, editMode, saveNewPlane, loadAllPlanes, updateEditedPlane, updateImage, fetchAllImages, setOwnerToEditPlane, getPlanesAsList, getSortedPlanes, getAllImages, resetNewPlane}
})
