export function chopName(name: string) {
  return name.split("_")[1].split(".")[0];
}
