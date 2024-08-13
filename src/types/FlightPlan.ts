import Plane from '@/types/Plane'

export default class FlightPlan {
  constructor(
    private id: string,
    public name: string,
    public freitext: string,
    public date: Date,
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

  withDate(value: Date): FlightPlan {
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

  public static createEmtptyFlugzeugliste(): FlightPlan {
    return new FlightPlan("", "","", new Date(Date.now()), []);
  }
}