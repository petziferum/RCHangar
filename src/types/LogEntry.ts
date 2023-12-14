
export default class LogEntry {
  constructor(public date: Date, public planeId: string, public text: string) {
    this.date = date;
    this.planeId = planeId;
    this.text = text;
  }

  withPlaneId(value: string): LogEntry {
    this.planeId = value;
    return this;
  }

  withDate(value: Date): LogEntry {
    this.date = value;
    return this;
  }

  withText(value: string): LogEntry {
    this.text = value;
    return this;
  }

  public static createEmtptyLogEntry(): LogEntry {
    return new LogEntry(undefined, undefined, undefined);
  }

  public static createLogEntryFromFirestore(obj: any): LogEntry {
    const date = new Date(obj.date.seconds * 1000);
    return new LogEntry(date, obj.planeId, obj.text);
  }
}
