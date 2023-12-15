<template>
  <v-container fluid>
    <v-toolbar title="Werkbank">
      <v-spacer />
      <BaseDialog activator-text="Flugzeug erstellen" />
      <v-spacer></v-spacer>
      <v-btn variant="outlined" elevation="2" class="bg-blue-accent-1">
        <v-icon icon="mdi-information-outline" />
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>

      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/BaseDialog.vue'
</script>
<style scoped>

</style>
