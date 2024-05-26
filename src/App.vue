<template>
  <v-app>
    <app-bar />
  <v-main app class="appMain">
  <RouterView />
  </v-main>
    <v-footer>
      <div class="footer">
    <div v-if="userState.userFirestoreData">
      fireUser: {{ userState.userFirestoreData }}
      <div v-if="userState.isAdmin">
        ADMIN <v-icon color="yellow">mdi-account</v-icon>
      </div>
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
import { RouterView } from 'vue-router'
import AppBar from '../src/components/common/AppBar.vue'
import { onBeforeMount, ref } from 'vue'
import { fireAuth, fireUser, registerWithGoogle, logOut as outlog } from '@/plugins/firesbaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'


const userState = useUserStore();

const u = ref(fireUser)

onBeforeMount(() => {
  onAuthStateChanged(fireAuth, (user) => {
    console.log("Check login status...", user? "logged in" : "logged out");
if (user) {
      u.value = user;
      userState.userFirestoreData = user;
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
  padding: 101px;
  background: #5a664b url('https://firebasestorage.googleapis.com/v0/b/hangar-7334.appspot.com/o/images%2FHimmel.jpg?alt=media&token=c90e264f-699b-4add-b042-84d1b97c59f2') repeat-y center center;
  background-size: 200%;
  background-attachment: fixed;
  border: 0px solid #00664b;
  box-shadow: 0px 25px 20px -2px rgba(0,0,0,0.5);
  border-radius: 20px;
  height: 100%;
  width: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url( 'https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg') no-repeat center center;
  background-size: cover;
  background-color: red;
  transform: scale(1.1);
}
</style>
