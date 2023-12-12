<template>
  <v-app-bar app class="appbar" dark elevation="20">
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
        <v-tab to="/">Hangar</v-tab>
        <v-tab v-show="user" to="/admin">Admin</v-tab>
      </v-tabs>

      <v-spacer />
      <template v-if="user">
        {{ user.email }}
      </template>
      <template v-else>
        <v-btn variant="text" @click="login">Login</v-btn>
      </template>
    </template>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script lang="ts" setup>
import { computed } from "vue";



const user = computed(() => {
  return {
    email: "email@mail.com"};
});

function login() {
  console.log("login");
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
