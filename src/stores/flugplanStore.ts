import { defineStore } from 'pinia'
import FlightPlan from '@/types/FlightPlan'
import { ref } from 'vue'
import FlightplanServiceApi from '@/api/flightplanService.api'

export const useFlugplanStore = defineStore('flugplanStore', {
  state: () => ({
    flugplan: FlightPlan.createEmtptyFlugzeugliste(),
    flugplaene: [] as FlightPlan[],
    flugplanEdit: <FlightPlan>(FlightPlan.createEmtptyFlugzeugliste()),
    flugplanCopy: <FlightPlan>(FlightPlan.createEmtptyFlugzeugliste()),
    loading: true
  }),
  actions: {
    fetchFlightplans() {
      this.loading = true
      FlightplanServiceApi.getAllFlightplans().then((data) => {
        this.flugplaene = data;
        setTimeout(()=>this.loading = false, 1000);
      })
    },
    startEditFlightPlan() {
      this.flugplanEdit = FlightPlan.createEmtptyFlugzeugliste()
    },
    addNewFlugplan(): void {
      this.loading = true
      //const randomId = Math.floor(Math.random() * (9999 - 1000) + 1000);
      this.flugplanEdit.withId(this.flugplanEdit.date.toLocaleDateString())
      FlightplanServiceApi.saveNewFlightplan(this.flugplanEdit).then(r => {
        this.loading = false
      })
      this.flugplaene.push(this.flugplanEdit)
      this.flugplanEdit = FlightPlan.createEmtptyFlugzeugliste()
    }
  },
  getters: {}
})