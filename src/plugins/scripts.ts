export function slugifyString(string: string): string {
  console.log("slugifyString gestartet", string);
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/ /g, "_")
    .replace(/[^\w-]+/g, "");
}
