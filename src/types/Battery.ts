enum Battery {
  zwei = "2S",
  drei = "3S",
  vier = "4S",
  fünf = "5S",
}

export const batteryToBeschreibung = new Map<string, string>([
  [Battery.zwei, "2S"],
  [Battery.drei, "3S"],
  [Battery.vier, "4S"],
  [Battery.fünf, "5S"],
]);

export const batteryAsRecord = Object.values(Battery).map((key) => {
  return { text: batteryToBeschreibung.get(key) as string, value: key };
});

export const BatteryAsList = Object.keys(Battery).map((key) => batteryToBeschreibung.get(key));

export default Battery;