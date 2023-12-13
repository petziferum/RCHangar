<template>
    <v-row class="mt-10 pt-10 shadow">
      <v-col cols="12" class="white--text text-center text-lg-h1 text-h5"
      >
        --<v-icon icon="mdi-home" /> Modellflugzeug - Hangar

      </v-col
      >
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
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
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">

</script>
<style scoped>
.shadow {
  box-shadow: inset 0px 50px 50px -20px rgba(0, 0, 0, 0.51);
}
</style>



