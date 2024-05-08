<template>
  <v-row class="mt-10">
    <v-col cols="12" md="6" lg="3">
      <v-select
        prefix="Sortieren nach:    "
        dark
        filled
        :items="orderList"
        v-model="orderBy"
        @input="getByOrder"
      ></v-select>
      <div class="mx-5 text-white">Flugzeuge: {{ planeStore.planesList.length }}, editplane {{ planeStore.editPlane.name }}</div>
    </v-col>
  </v-row>
  <!-- Todo: Darstellung der Flugzeuge als v-data-iterator -->
  <v-row>
    <v-icon v-if="planeStore.hangarLoading" class="mx-5" icon="mdi-knob mdi-spin" color="grey" />
    <template v-else>
      <v-expansion-panels>
        <v-expansion-panel v-for="plane in planeStore.getSortedPlanes" :key="plane.id">
          <v-expansion-panel-title
            ripple
            :style="panelImage(plane.image)"
          >
            <template v-slot:actions="{ expanded }">
            <v-row>
              <v-fade-transition leave-absolute>
                <v-col
                  :cols="expanded ? 2 : 6"
                  class="red--text font-weight-bold"
                  style="transform: rotate(-25deg)"
                ><span v-if="plane.crash">CRASHED</span></v-col
                >
              </v-fade-transition>
            </v-row>
            </template>
            <v-spacer />
            <v-row no-gutters>
              <v-col cols="3">
                {{ plane.name }}
              </v-col>
              <v-col
                v-if="!isMobile"
                cols="3"
                class="grey--text caption"
              >
                Gewicht: {{ plane.gewicht }}
              </v-col>
              <v-col
                v-if="!isMobile"
                cols="3"
                class="grey--text caption"
              >
                Spannweite: {{ plane.spannweite }}
              </v-col>
              <v-col
                v-if="!isMobile"
                cols="3"
                class="grey--text caption"
              >
                Faktor: {{ plane.faktor }}
              </v-col>
            </v-row>
            <v-spacer />
            <div>
              <v-btn icon="mdi-cog" @click.stop="editPlane(plane)"></v-btn>

            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <template v-if="adminUser">
              <AdminActionBar :plane="plane" @update="getPlanes" />
            </template>
            <v-dialog>
              <template v-slot:activator="{ props }">
                <v-img
                  :src="plane.image"
                  class="contImg"
                  width="100%"
                  height="200px"
                  v-bind="props"
                >
                  <v-overlay
                    v-if="plane.crash"
                    color="red"
                    absolute
                    class="red--text text-h1"
                  >
                    Schrott
                  </v-overlay>
                </v-img>
              </template>
              <v-img :src="plane.image" width="100%"></v-img>
            </v-dialog>
            <v-card tile elevation="4">
              <v-row>
                <v-col cols="12">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                      <tr v-for="(value, key) in plane" :key="key">
                        <th>{{ key }}</th>
                        <td>{{ value }}</td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-text
                    class="descriptionBox elevation-4"
                    text="plane.beschreibung"
                  ></v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <v-dialog width="100%" v-model="editDialog" >
                      <the-edit-plane @cancel="editDialog = false" @save="editDialog = false"/>
    </v-dialog>
  </v-row>
</template>
<script setup lang="ts">
//Todo: Authentifizierung wenn nicht angemeldet keine Bearbeitung möglich.
import { computed, ref } from 'vue'
import { usePlaneStore } from '@/stores/planeStore'
import { useUserStore } from '@/stores/userStore'
import { useDisplay } from 'vuetify'
import Plane from '@/types/Plane'
import TheEditPlane from '@/components/TheEditPlane.vue'
const planeStore = usePlaneStore();
const userStore = useUserStore();
const orderList = ref(["name", "id", "faktor", "gewicht", "spannweite"])
const orderBy = ref("name")
const { mobile } = useDisplay()
const adminUser = computed(() => {
  return userStore.isAdmin;
})
const isMobile = computed(() => {
  return mobile.value;
})
const editDialog = ref(false);

function getByOrder() {
  console.info("order by", orderBy.value);
  getPlanes();
}

function getPlanes() {
  planeStore.loadAllPlanes();
}
function editPlane(plane: Plane): void{
  console.log("edit plane", plane.name);
  planeStore.editPlane = plane;
  editDialog.value = true;
}

function panelImage(image: string | undefined): string {
  const style =
    "backgroundImage: url(" + image + "); background-size: contain";
  return style;
}
</script>
<style scoped>
.contImg {
  width: 100% !important;
  cursor: pointer;
  margin: 0 !important;
  left: 0px;
}
</style>
