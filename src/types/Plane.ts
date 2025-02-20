import Sender from '@/types/Sender'
import Battery from '@/types/Battery'
import LogEntry from '@/types/LogEntry'
import User from '@/types/User'
import { serverTimestamp } from 'firebase/firestore'
import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import type { _ExtractStateFromSetupStore } from 'pinia'



export default class Plane {
  id: string;
  name: string;
  owner: User;
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
  updatedAt?: Date

  constructor(
    id: string = '',
    name: string,
    owner: User,
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
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
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
    this.updatedAt = updatedAt;
  }

  withOwner(value: User): Plane {
    this.owner = value;
    return this;
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

  withUpdatedAt(value: Date): Plane {
    this.updatedAt = value;
    return this;
  }

  static createFirePlane(id: string, obj: Plane): Plane {
    return new Plane(
      id,
      obj.name,
      obj.owner,
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
      obj.updatedAt
    ).withId(obj.id!);
  }

  static createEmptyPlane(): Plane {
    return new Plane(
      '',
      '',
      User.createEmptyUser(),
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
      false,
      undefined);
  }
}

function ownerConverter(owner: User) {
  const plainObject =
    {
      id: owner.id,
      name: owner.name,
      displayName: owner.displayName,
      email: owner.email,
      isAdmin: owner.isAdmin
    }
  return plainObject;
}

export const planeConverter = {
  toFirestore: function (plane: Plane) {
    return {
      id: plane.id,
      name: plane.name,
      owner: {
        id: plane.owner.id || undefined,
        name: plane.owner.name || undefined,
        displayName: plane.owner.displayName || undefined,
        email: plane.owner.email || undefined,
        isAdmin: plane.owner.isAdmin || undefined,
      },
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
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return Plane.createFirePlane(snapshot.id,{
      ...data,
      id: snapshot.id,
      log: logConverterTimestampToDate(data.log),
    });
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
