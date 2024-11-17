import Plane from '@/types/Plane'
import { Timestamp } from "firebase/firestore"

export default class FlightPlan {
  constructor(
    public id: string,
    public name: string,
    public freitext: string,
    public date: Timestamp,
    public flugzeuge: Plane[]
  ) {
    this.id = id;
    this.name = name;
    this.freitext = freitext;
    this.date = date;
    this.flugzeuge = flugzeuge;
  }

  withId(value: string): FlightPlan {
    this.id = value;
    return this;
  }

  withName(value: string): FlightPlan {
    this.name = value;
    return this;
  }

  withDate(value: Timestamp): FlightPlan {
    this.date = value;
    return this;
  }

  withFlugzeuge(value: Plane[]): FlightPlan {
    this.flugzeuge = value;
    return this;
  }

  addFlugzeug(value: Plane): void {
    this.flugzeuge.push(value);
  }
  withFreitext(value: string): FlightPlan {
    this.freitext = value;
    return this;
  }

  public static getDate(timestamp: Timestamp): string {
    const seconds = timestamp.seconds;
    return new Date(seconds * 1000).toLocaleDateString();
  }
  public static createEmtptyFlugzeugliste(): FlightPlan {
    return new FlightPlan("", "","", Timestamp.now(), []);
  }
}