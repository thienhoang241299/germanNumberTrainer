import writtenNumber from "written-number";

writtenNumber.defaults.lang = "de";

export function numberToGerman(num: number): string {
  return writtenNumber(num);
}
