import { getJson } from "./http";

export interface MedalRow {
  id: number;
  code: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  points: number;
}

export function getMedalTable() {
  return getJson<MedalRow[]>("/medalTable?_sort=points&_order=desc");
}
