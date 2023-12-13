<template>
  <v-app>
    <app-bar />
  <v-main class="appMain">
  <RouterView />
  </v-main>
    <v-footer>
      <div class="footer">
    <div v-if="u" style="height: 200px">
      fireUser: {{ u.email }}
      <div>
        <v-btn @click="logOut">logout</v-btn>
      </div>
    </div>
      <div v-else>
        <v-btn @click="registerWithGoogle">Login mit Google</v-btn>
      </div>
      </div>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppBar from '../src/components/common/AppBar.vue'
import { onBeforeMount, ref } from 'vue'
import { fireAuth, fireUser, registerWithGoogle, logOut as outlog } from '@/plugins/firesbaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from 'firebase/compat'

const u = ref(fireUser)

onBeforeMount(() => {
  onAuthStateChanged(fireAuth, (user) => {
    console.log("Authstate changed", user);
if (user as firebase.User) {
      u.value = user;
    } else {
      u.value= null;
    }
  });
});
function logOut() {
  outlog();
}
</script>
<style scoped>
.footer {
  height: 300px;
  align-content: center;
  margin-top: 5px;
}
.appMain {
  z-index: 5;
  padding-top: 64px;
  background-color: #5a664b;
  border: 0px solid #00664b;
  box-shadow: 0px 5px 8px -1px rgba(0,0,0,0.7);
  border-radius: 20px;
  height: 100%;
  width: 100%;
}
</style>
