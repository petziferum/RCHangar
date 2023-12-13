import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore("userStore", () => {
  const userFirestoreData = ref(null);
  const userLoggedIn = ref(false);
  const user = ref({});
  const userLoading = ref(false);
  const userError = ref("");

  watch(userFirestoreData, (newVal) => {
    if (newVal) {
      user.value = newVal;
      userLoggedIn.value = true;
    }
  });

  function setUserFirestoreData(data: any) {
    userFirestoreData.value = data;
  }
  return { userFirestoreData, userError, userLoggedIn, setUserFirestoreData };
});