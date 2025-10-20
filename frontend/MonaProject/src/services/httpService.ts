import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", 
  withCredentials: true,                
});

export interface MedalRow {
  id: string;
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
  id: string;
  name: string;
  days: string[];
  icon: DisciplineIcon;
}

export const getPuntajesPorDisciplina = async (): Promise<StandingRow[]> => {
  const { data } = await api.get("/puntajesPorDisciplina");
  return data;
};

export const getMedalRows = async (): Promise<MedalRow[]> => {
  const { data } = await api.get("/medalTable");
  return data;
};

export const getDisciplineRows = async (): Promise<DisciplineRow[]> => {
  const { data } = await api.get("/disciplinas");
  return data;
};

export const loginUser = async (username: string, password: string) => {
  const { data } = await api.post("/login", { username, password });
  return data;
};

export const getSession = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
export default api;
