<template>
  <v-container>
    <v-card variant="outlined">
      <v-card-title>PhotoUploadComponent</v-card-title>
      <v-card-text>
        <v-form>
          <v-file-input
            ref="fileinput"
            :rules="fileRules"
            accept="image/*"
            label="File input"
            outlined
            dense
            @change="onFileInput"
          ></v-file-input>
          <v-alert
            v-if="uploadStatus"
            :color="uploadStatus.type"
            class="mt-4"
            dense
            dismissible
          >
            {{ uploadStatus.message }}
          </v-alert>
        </v-form>
      </v-card-text>
      <v-card-text v-if="fileinput">
        <div height="100px" class="border">
          <v-img
            style="border: 5px; border-radius: 30px"
            max-height="800px"
            cover
            :src="imgsrc"
          ></v-img>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="uploadImage"
          block
          elevation="5"
          style="background-color: #699fda; color: white"
          variant="elevated"
          >upload</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
interface UploadStatus {
  type: string;
  message: string;
}
import { toast } from "vue3-toastify";
import { ref } from "vue";
import {  getStorage } from "firebase/storage";
import ApiService from '@/api/hangarService.api'
import { usePlaneStore } from '@/stores/planeStore'

const fileRules = [(v) => !!v || "File is required"];
const fileinput = ref();
const storage = getStorage();
const uploadStatus = ref<UploadStatus | null>(null);
const loading = ref(false);
const imgsrc = ref("");
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 10MB
const folder = "recipes/";
const planeStore = usePlaneStore();

const onFileInput = () => {
  const input = fileinput.value;
  if (input && input.files && input.files.length > 0) {
    const file = input.files[0];
    if (file.size > MAX_FILE_SIZE) {
      uploadStatus.value = { type: "error", message: "File too large!" };
      return;
    } else
      uploadStatus.value = {
        type: "success",
        message: `File selected with size: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)} MB`,
      };
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      imgsrc.value = e.target?.result as string;
    };
    fileReader.readAsDataURL(file);
  }
};
const uploadImage = async () => {
  const file = fileinput.value.files[0];
  if (!file) {
    uploadStatus.value = { type: "error", message: "No file selected!" };
    return;
  }
  planeStore.hangarLoading = true;
  await ApiService.uploadImage(file).then((url) => {
    planeStore.updateImage(url);
    toast.success("File uploaded! \n" + `${url}`, {
      icon: "mdi-fire",
      dangerouslyHTMLString: true,
    });
    uploadStatus.value = {
      type: "success",
      message: `Datei unter ${url} hochgeladen.`,
    };
    reset();
  });
};
const reset = () => {
  fileinput.value = "";
  imgsrc.value = "";
  uploadStatus.value = null;
};
</script>
<style scoped></style>
