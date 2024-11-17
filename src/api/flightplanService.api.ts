import FlightPlan from '@/types/FlightPlan'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/plugins/firesbaseConfig'

export default class FlightplanServiceApi {

  public static async saveNewFlightplan(flightplan: FlightPlan): Promise<void> {
    const { id, ...flightplanData } = flightplan
    return await setDoc(doc(db, 'flightplans', flightplan.id), flightplanData)
      .then(response => {
        console.log('Flightplan saved: ', response)
        return response
      })
  }

  public static async getAllFlightplans(): Promise<FlightPlan[]> {
    const plans: FlightPlan[] = []
    await getDocs(collection(db, 'flightplans'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const plan = doc.data() as FlightPlan
          const id = doc.id
          plan.id = id
          console.log('plan: ', plan)
          plans.push(plan)
        })
      })
    return plans
  }

  public static async getFlightplanById(id: string): Promise<FlightPlan> {
    return new Promise((resolve, reject) => {
      return FlightPlan.createEmtptyFlugzeugliste() // muss noch ausformuliert werden
    })
  }

  public static deleteFlightplan(id: string): Promise<void> {
    return deleteDoc(doc(db, 'flightplans', id)).then(r => {
      console.log('Flightplan deleted: ', r)
    })
  }

  public static updateFlightplan(flightplan: FlightPlan): Promise<void> {
    console.log("update flugplan: ", flightplan.id);
    const { id, ...flightplanData } = flightplan
    return setDoc(doc(db, 'flightplans', flightplan.id), flightplanData).then(r => {
      console.log('Flightplan updated: ', r)
    })
  }

}