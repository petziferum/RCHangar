enum Battery {
  zwei = "2S",
  drei = "3S",
  vier = "4S",
  fünf = "5S",
}

export const BatteryToBeschreibung = new Map<string, string>([
  [Battery.zwei, "2S"],
  [Battery.drei, "3S"],
  [Battery.vier, "4S"],
  [Battery.fünf, "5S"],
]);

export const BatteryAsRecord: Record<string, string>[] = Object.values(
  Battery
).map((key) => {
  return { text: BatteryToBeschreibung.get(key), value: key };
});
export default Battery;
