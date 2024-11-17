import { defineStore } from 'pinia'
import FlightPlan from '@/types/FlightPlan'
import { ref } from 'vue'

export const useFlugplanStore = defineStore("flugplanStore", {
  state: () => ({
  flugplan: FlightPlan.createEmtptyFlugzeugliste(),
  flugplaene: [] as FlightPlan[],
  flugplanEdit: ref<FlightPlan>(FlightPlan.createEmtptyFlugzeugliste()),
  flugplanCopy: ref<FlightPlan>(FlightPlan.createEmtptyFlugzeugliste()),
}),
  actions: {
    fetchFlightplans() {
      // fetch flightplans from firebase
    },
    startEditFlightPlan() {
      this.flugplanEdit = FlightPlan.createEmtptyFlugzeugliste();
    },
    addNewFlugplan(): void {
      //const randomId = Math.floor(Math.random() * (9999 - 1000) + 1000);
      this.flugplanEdit.withId(this.flugplanEdit.date.toLocaleDateString());
      this.flugplaene.push(this.flugplanEdit);
      this.flugplanEdit = FlightPlan.createEmtptyFlugzeugliste();
    }
  },
  getters: {}
});