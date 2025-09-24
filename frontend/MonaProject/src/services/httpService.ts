import axios from "axios";

export interface MedalRow {
  id: number;
  code: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  points: number;
}

// Por disciplina y carrera/departamento
export interface StandingRow {
  code: string; // abreviatura (ING, MED, etc.)
  name: string; // nombre carrera/depto
  discipline: string; // disciplina
  PJ: number;
  PG: number;
  PE: number;
  PP: number;
}

export type DisciplineIcon =
  | "Fútbol"
  | "Tenis"
  | "Básquetbol"
  | "Natación"
  | "Taca-Taca";

export interface DisciplineRow {
  id: number;
  name: string;
  days: string[];
  icon: DisciplineIcon;
}

const getPuntajesPorDisciplina = () => {
  const request = axios.get("api/puntajesPorDisciplina");
  return request.then((res) => res.data);
};

const getMedalRows = () => {
  const request = axios.get("api/medalTable");
  return request.then((res) => res.data);
};

const getDisciplineRows = () => {
  const request = axios.get("api/disciplinas");
  return request.then((res) => res.data);
};

export default { getPuntajesPorDisciplina, getMedalRows, getDisciplineRows };
