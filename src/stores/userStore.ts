import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { type User as FireUser } from 'firebase/auth'
import User from '@/types/User'

export const useUserStore = defineStore("userStore", () => {
  const userFirestoreData = ref<FireUser | null>(null);
  const userLoggedIn = ref(false);
  const appUser = ref<User>(User.createEmptyUser());
  const userLoading = ref(true);
  const userError = ref("");

  watch(userFirestoreData, (newVal, oldValue) => {
    if (newVal) {
      console.log("userStore: ", newVal, oldValue);
      appUser.value = User.setUserFromFirebase(newVal);
      userLoggedIn.value = true;
      if(newVal.uid === 'Pjkzvd5lIodGknPvC2agDSa3e8r1') {
        appUser.value.isAdmin = true;
      }
    }
  });

  function setUserFirestoreData(data: any) {
    userFirestoreData.value = data;
  }

  const isAdmin = computed(() => {
    return appUser.value.isAdmin;
  });

  return { userFirestoreData, appUser, userLoading, userError, userLoggedIn, setUserFirestoreData, isAdmin };
});