enum Sender {
  SPEKTRUM = "Spektrum",
  TURNIGY = "Turnigy",
  UNKNOWN = "Unknown",
}
export const StringToSender = new Map<string | undefined, string>([
  ["Turnigy", Sender.TURNIGY],
  ["Spektrum", Sender.SPEKTRUM],
  ["Unbekannt", Sender.UNKNOWN],
  [undefined, Sender.UNKNOWN],
]);

export const SenderToBeschreibung = new Map<string, string>([
  [Sender.TURNIGY, "Turnigy"],
  [Sender.SPEKTRUM, "Spektrum"],
  [Sender.UNKNOWN, "Noch keiner"],
]);
export const SenderAsRecord: Record<string, string>[] = Object.values(
  Sender
).map((key) => {
  return {
    text: SenderToBeschreibung.get(key) as string,
    value: key,
  };
});

export default Sender;
