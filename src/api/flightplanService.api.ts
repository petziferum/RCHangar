import FlightPlan from '@/types/FlightPlan'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/plugins/firesbaseConfig'

export default class FlightplanServiceApi {

  public static async saveNewFlightplan(flightplan: FlightPlan): Promise<void> {
    const { id, ...flightplanData } = flightplan;
    return await setDoc(doc(db, "flightplans", flightplan.id), flightplanData)
      .then(response => {
        console.log("Flightplan saved: ", response);
        return response;
      });
  }

    public static async getAllFlightplans(): Promise<FlightPlan[]> {
    const plans: FlightPlan[] = [];
    await getDocs(collection(db, "flightplans"))
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  plans.push(doc.data() as FlightPlan);
                });
              });
            return plans;
    }

    public static async getFlightplanById(id: string): Promise<FlightPlan> {
        return new Promise((resolve, reject) => {
            return FlightPlan.createEmtptyFlugzeugliste(); // muss noch ausformuliert werden
        });
    }
}