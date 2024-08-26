<template>
<v-container>
  <v-row>
    <v-col>
      <h1>User Dashboard</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-card tile width="600">
      <v-card-title style="display: flex;">
        <div style="width: 100%;">Benutzerinformationen</div><v-icon icon="mdi-logout" class="logoutButton" @click="logOut" />
      </v-card-title>
      <v-card-subtitle v-if="user.isAdmin">
        <v-chip color="green" variant="elevated" size="small" label>Admin</v-chip>
      </v-card-subtitle>
      <v-card-text>
        Benutzer: {{ user.name }}<br>
        Displayname: {{ user.displayName }}<br>
        Email: {{ user.email }}<br>
        ID: {{ user.id }}<br>
      </v-card-text>
    </v-card>
  </v-row>
</v-container>
</template>
<script setup lang=ts>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import type User from '@/types/User'
import { logOut as outlog } from '@/plugins/firesbaseConfig'


const userStore = useUserStore();
const user = computed((): User => {
  return userStore.appUser;
});
function logOut() {
  outlog();
}


</script>
<style scoped>
.logoutButton {
  justify-content: flex-end;
}
</style>