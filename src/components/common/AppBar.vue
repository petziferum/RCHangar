<template>
  <v-app-bar scroll-behavior="inverted" class="appbar" dark elevation="20">

    <template v-slot:extension>
      <v-tabs v-model="isSelected">
        <!-- <v-tab to="devtest">devTest</v-tab> -->
        <v-tab to="/">Home</v-tab>
        <v-tab v-show="user" to="/werkbank">Werkbank</v-tab>
        <v-tab to="/hangar">Hangar</v-tab>
      </v-tabs>
      <v-spacer />
      <template v-if="user">
        <v-icon icon="mdi-account" class="mx-5" @click="goToUserDashboard" /><span class="mr-4">{{ user.displayName }}</span>
      </template>
      <template v-else>
        <v-btn variant="text" @click="login">Login</v-btn>
      </template>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { logOut as outlog, registerWithGoogle } from '@/plugins/firesbaseConfig'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const userState = useUserStore();
const isSelected = ref(0);
const user = computed(() => {
  return userState.userFirestoreData;
});
const goToUserDashboard = () => {
  router.push('/user/'+ user.value?.uid);
  isSelected.value = -1;
}



function login() {
  registerWithGoogle();
}
</script>

<style scoped>
.appbar {
  background-color: #293556;
  color: white;
}
.routerlink {
  position: relative;
  top: 10px;
  height: 200px;
  width: 100%;
}
</style>
