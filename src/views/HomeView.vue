<template>
    <v-row class="mt-10 pt-10 shadow">
      <v-col cols="12" class="white--text text-center text-lg-h1 text-h5"
      >
        <v-icon icon="mdi-controller mdi-spin" aria-hidden /><v-icon icon="mdi-airplane" aria-hidden /> Modellflugzeug - Hangar <v-icon icon="mdi-knob mdi-spin" />

      </v-col
      >
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <v-card>
          <v-card-text>
            In dieser App werden alle Flugzeuge aufgelistet, die gerade in
            unserem Keller "lagern".<br />
            Die Modelle sind selbstgebaut und bestehen in den meisten Fällen aus
            Balsa- und Sperrholz. Manche Modelle sind aus Styropor. Alle hier
            gelisteten Modell sind mit Elektromotoren, Motorreglern und Servos
            ausgestattet, damit sie per Fernsteuerung geflogen werden können.
            Zum fliegen dieser Modelle werden LiPo-Akkus mit 2 oder mehr Zellen
            eingesetzt. Da die Modelle zum Teil echten Flugzeugen nachempfunden
            sind, ist auch eine Beschreibung dabei die die Geschichte des
            Originalen Flugzeugtyps erzählt.
            <p>Viel Spaß beim Stöbern!</p>
          </v-card-text>
          <v-card-text>
            <v-btn @click="planeStore.loadAllPlanes()">get planes</v-btn>
            <v-icon v-if="planeStore.hangarLoading" class="mx-5" icon="mdi-knob mdi-spin" color="grey" />
          </v-card-text>
          <v-card-text>
            <v-data-iterator
              :items="planeStore.getSortedPlanes"
              :items-per-page="itemsPerPage"
              :page="page" >
              <template #header="{ page, pageCount, prevPage, nextPage}">
                <v-toolbar>
                <v-btn @click="prevPage" :disabled="page === 1">prev</v-btn>
                <v-btn @click="nextPage" :disabled="page === pageCount">next</v-btn>
                  <div>
                  Seite: {{ page }} / {{ pageCount }}
                  </div>
                </v-toolbar>
              </template>
              <template #default="{ items }">
                <v-row>
                  <v-col cols="12" md="6" lg="3" v-for="(plane, i) in items" :key="i">
                    <v-card>
                      <v-img :src="plane.raw.image" height="200px" />
                      <v-card-title>{{ plane.raw.name }}</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="6">Gewicht: {{ plane.raw.gewicht }}</v-col>
                          <v-col cols="6">Spannweite: {{ plane.raw.spannweite }}</v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
              <template #footer="{ page, pageCount, prevPage, nextPage}">
                <v-toolbar>
                  <v-spacer />
                <v-btn @click="prevPage" :disabled="page === 1">prev</v-btn>
                <v-btn @click="nextPage" :disabled="page === pageCount">next</v-btn>
                  <v-spacer />
                  <div>
                  Seite: {{ page }} / {{ pageCount }}
                  </div>
                  <v-spacer />
                </v-toolbar>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { usePlaneStore } from '@/stores/planeStore';
import { ref } from 'vue'

const planeStore = usePlaneStore();
const page = ref(1);
const itemsPerPage = 12;
</script>
<style scoped>
.shadow {
 box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
}
</style>



