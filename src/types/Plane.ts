import Sender from '@/types/Sender'
import Battery from '@/types/Battery'
import LogEntry from '@/types/LogEntry'

export default class Plane {
  id: string;
  name: string;
  sender: Sender;
  battery: Battery;
  mah: number;
  type: string;
  bauweise: string;
  gewicht: number;
  spannweite: number;
  faktor: number;
  image: string;
  beschreibung?: string;
  log: LogEntry[];
  crash?: boolean;
  lastEdit?: Date

  constructor(
    id: string = '',
    name: string,
    sender: Sender,
    battery: Battery,
    mah: number,
    type: string,
    bauweise: string,
    gewicht: number,
    spannweite: number,
    faktor: number,
    image: string,
    beschreibung: string | undefined,
    log: LogEntry[],
    crash: boolean | undefined,
    lastEdit?: Date
  ) {
    this.id = id;
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
    this.lastEdit = lastEdit;
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

  withLastEdit(value: Date): Plane {
    this.lastEdit = value;
    return this;
  }

  static createFirePlane(obj: Plane): Plane {
    return new Plane(
      obj.id,
      obj.name,
      obj.sender,
      obj.battery,
      obj.mah,
      obj.type,
      obj.bauweise,
      obj.gewicht,
      obj.spannweite,
      obj.faktor,
      obj.image,
      obj.beschreibung,
      logConverterTimestampToDate(obj.log),
      obj.crash,
      obj.lastEdit
    ).withId(obj.id!);
  }

  static createEmptyPlane(): Plane {
    return new Plane(
      '',
      '',
      Sender.UNKNOWN,
      Battery.zwei,
      0,
      '',
      '',
      0,
      0,
      0,
      '',
      '',
      [],
      false);
  }
}
export const planeConverter = {
  toFirestore: function (plane) {
    console.log("Converter gestartet für ", plane);
    return {
      id: plane.id,
      name: plane.name,
      sender: plane.sender ? plane.sender : Sender.UNKNOWN,
      battery: plane.battery ? plane.battery : Battery.zwei,
      mah: plane.mah ? plane.mah : 0,
      type: plane.type,
      bauweise: plane.bauweise,
      gewicht: plane.gewicht,
      spannweite: plane.spannweite,
      faktor: plane.faktor,
      image: plane.image,
      beschreibung: plane.beschreibung,
      log: logConverter(plane.log),
      crash: plane.crash,
      lastEdit: new Date(Date.now()),
    };
  },
  fromFirestore: (snapshot, options) => {
    const plane = snapshot.data(options);
    return Plane.createFirePlane(plane);
  },
};

const logConverter = (log: LogEntry[]): unknown[] => {
  const logArray: unknown[] = [];
  log.forEach((entry) => {
    const plainObject = {
      date: entry.date,
      planeId: entry.planeId,
      text: entry.text
    };
    logArray.push(plainObject);
  });
  return logArray;
};

const logConverterTimestampToDate = (array: LogEntry[]): Array<LogEntry> => {
  const logArray: LogEntry[] = [];
  if (array != null) {
    array.forEach((entry) => {
      logArray.push(LogEntry.createLogEntryFromFirestore(entry));
    });
  }
  return logArray;
};
