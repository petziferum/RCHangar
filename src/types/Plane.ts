import Sender from "@/types/Sender";
import Battery from "@/types/Battery";
import LogEntry from "@/types/LogEntry";

export default class Plane {
  id: string | undefined;
  name: string | undefined;
  sender: Sender | undefined;
  battery: Battery | undefined;
  mah: number | undefined;
  type: string | undefined;
  bauweise: string | undefined;
  gewicht: number | undefined;
  spannweite: number | undefined;
  faktor: number | undefined;
  image: string | undefined;
  beschreibung?: string;
  log?: LogEntry[];
  crash?: boolean;

  constructor(
    name: string | undefined,
    sender: Sender | undefined,
    battery: Battery | undefined,
    mah: number | undefined,
    type: string | undefined,
    bauweise: string | undefined,
    gewicht: number | undefined,
    spannweite: number | undefined,
    faktor: number | undefined,
    image: string | undefined,
    beschreibung: string | undefined,
    log: LogEntry[] | undefined,
    crash: boolean | undefined
  ) {
    this.name = name;
    this.sender = sender;
    this.battery = battery;
    this.mah = mah;
    this.type = type;
    this.bauweise = bauweise;
    this.gewicht = gewicht;
    this.spannweite = spannweite;
    this.faktor = faktor;
    this.image = image;
    this.beschreibung = beschreibung;
    this.log = log;
    this.crash = crash;
  }

  withMah(value: number): Plane {
    this.mah = value;
    return this;
  }

  withBeschreibung(value: string): Plane {
    this.beschreibung = value;
    return this;
  }

  withCrash(value: boolean): Plane {
    this.crash = value;
    return this;
  }

  withName(name: string): Plane {
    this.name = name;
    return this;
  }

  withSender(value: Sender): Plane {
    this.sender = value;
    return this;
  }

  withBattery(value: Battery): Plane {
    this.battery = value;
    return this;
  }

  withType(value: string): Plane {
    this.type = value;
    return this;
  }

  withBauweise(bauweise: string): Plane {
    this.bauweise = bauweise;
    return this;
  }

  withGewicht(value: number): Plane {
    this.gewicht = value;
    return this;
  }

  withSpannweite(value: number): Plane {
    this.spannweite = value;
    return this;
  }

  withFaktor(value: number): Plane {
    this.faktor = value;
    return this;
  }

  withImage(value: string): Plane {
    this.image = value;
    return this;
  }

  withId(value: string): Plane {
    this.id = value;
    return this;
  }

  addLogEntry(value: LogEntry): void {
    this.log.push(value);
  }

  static createFirePlane(obj: Plane): Plane {
    return new Plane(
      obj.name || undefined,
      obj.sender || undefined,
      obj.battery || undefined,
      obj.mah || undefined,
      obj.type || undefined,
      obj.bauweise || undefined,
      obj.gewicht || undefined,
      obj.spannweite || undefined,
      obj.faktor || undefined,
      obj.image || undefined,
      obj.beschreibung,
      logConverterTiemstampToDate(obj.log),
      obj.crash
    );
  }

  static createEmptyPlane(): Plane {
    return new Plane(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "",
      undefined,
      undefined,
      undefined
    );
  }
}
export const planeConverter = {
  toFirestore: function (plane) {
    console.log("Converter gestartet für ", plane);
    return {
      id: plane.id,
      name: plane.name,
      sender: plane.sender,
      battery: plane.battery,
      mah: plane.mah,
      type: plane.type,
      bauweise: plane.bauweise,
      gewicht: plane.gewicht,
      spannweite: plane.spannweite,
      faktor: plane.faktor,
      image: plane.image,
      beschreibung: plane.beschreibung,
      log: logConverter(plane.log),
      crash: plane.crash,
    };
  },
  fromFirestore: (snapshot, options) => {
    const plane = snapshot.data(options);
    return Plane.createFirePlane(plane);
  },
};

const logConverter = (log: Array<LogEntry>): Array<unknown> => {
  const logArray = [];
  if (log.length > 0) {
    log.forEach((entry) => {
      logArray.push({
        date: entry.date,
        planeId: entry.planeId,
        text: entry.text,
      });
    });
  }
  return logArray;
};

const logConverterTiemstampToDate = (array: LogEntry[]): Array<LogEntry> => {
  const logArray = [];
  if (array != null) {
    array.forEach((entry) => {
      logArray.push(LogEntry.createLogEntryFromFirestore(entry));
    });
  }
  return logArray;
};
