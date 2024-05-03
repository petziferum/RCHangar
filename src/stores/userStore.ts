import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { type User } from 'firebase/auth'

export const useUserStore = defineStore("userStore", () => {
  const userFirestoreData = ref<User | null>(null);
  const userLoggedIn = ref(false);
  const user = ref({});
  const userLoading = ref(false);
  const isAdmin = ref(false);
  const userError = ref("");

  watch(userFirestoreData, (newVal) => {
    if (newVal) {
      user.value = newVal;
      userLoggedIn.value = true;
      if(newVal.uid === 'Pjkzvd5lIodGknPvC2agDSa3e8r1') isAdmin.value = true;
    }
  });

  function setUserFirestoreData(data: any) {
    userFirestoreData.value = data;
  }
  return { userFirestoreData, userLoading, userError, userLoggedIn, setUserFirestoreData, isAdmin };
});