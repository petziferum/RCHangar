<template>
  <v-card variant="outlined">
    <v-card-title>Photo Selection</v-card-title>
    <v-card-text>
      <div class="imageGrid">
        <div class="elevatetImage" v-for="img in planeStore.getAllImages" :key="img">
          <v-img :src="img" cover>
            <v-btn
              variant="tonal"
              block
              rounded="0"
              height="100%"
              @click="selectImageForRecipe(img)"
            ></v-btn>
          </v-img>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import { usePlaneStore } from '@/stores/planeStore'

const planeStore = usePlaneStore();

onBeforeMount(() => {
  planeStore.fetchAllImages();
});

function selectImageForRecipe(url: string) {
  planeStore.updateImage(url);
}
</script>
<style scoped>
.imageGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}
.elevatetImage {
  display: flex;
  position: relative;
  border: 1px solid grey;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.29);
  margin: 5px;
  width: 100px;
  height: 100px;
}
</style>
