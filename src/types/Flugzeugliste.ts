import Plane from "@/types/Plane";

export default class Flugzeugliste {
  constructor(
    private id: string,
    private name: string,
    private date: Date,
    private flugzeuge: Plane[]
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.flugzeuge = flugzeuge;
  }

  withId(value: string): Flugzeugliste {
    this.id = value;
    return this;
  }

  withName(value: string): Flugzeugliste {
    this.name = value;
    return this;
  }

  withDate(value: Date): Flugzeugliste {
    this.date = value;
    return this;
  }

  withFlugzeuge(value: Plane[]): Flugzeugliste {
    this.flugzeuge = value;
    return this;
  }

  addFlugzeug(value: Plane): void {
    this.flugzeuge.push(value);
  }

  public static createEmtptyFlugzeugliste(): Flugzeugliste {
    return new Flugzeugliste(undefined, undefined, undefined, undefined);
  }
}
