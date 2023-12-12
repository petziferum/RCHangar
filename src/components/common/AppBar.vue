<template>
  <v-app-bar app color="#3b477a" dark class="shadow">
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
.shadow {
  -webkit-box-shadow: 0px 20px 23px -7px #000000, 50px -2px 25px 13px rgba(53,255,222,0);
  box-shadow: 0px 30px 23px -7px #000000, 50px -2px 35px 33px rgba(53,255,222,0);
}
.appbar {
  background-color: #222b45;
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
