<template>
  <v-app-bar scroll-behavior="inverted" class="appbar" dark elevation="20">
    <router-link to="/" class="routerlink">
      <v-img
        transition="slide-x-reverse-transition"
        alt="Hangar Logo"
        class="mx-auto logo"
        contain
        min-width="100"
        max-width="60%"
        height="50%"
      />
    </router-link>

    <template v-slot:extension>
      <v-tabs>
        <!-- <v-tab to="devtest">devTest</v-tab> -->
        <v-tab to="/">Home</v-tab>
        <v-tab v-show="user" to="/werkbank">Werkbank</v-tab>
        <v-tab to="/hangar">Hangar</v-tab>
      </v-tabs>

      <v-spacer />
      <template v-if="user">
        {{ user.email }}
        <v-icon icon="mdi-logout" class="mx-5" @click="logOut" />
      </template>
      <template v-else>
        <v-btn variant="text" @click="login">Login</v-btn>
      </template>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { logOut as outlog, registerWithGoogle } from '@/plugins/firesbaseConfig'
import { useUserStore } from '@/stores/userStore'

const userState = useUserStore();

const user = computed(() => {
  return userState.userFirestoreData;
});

function logOut() {
  outlog();
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
.logo {
  position: absolute;
  border: 0;
  right: 10px;
  top: 50px;
}
.routerlink {
  position: relative;
  top: 10px;
  height: 200px;
  width: 100%;
}
</style>
