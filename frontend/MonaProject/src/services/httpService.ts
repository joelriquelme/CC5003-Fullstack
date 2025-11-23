import axios, { type AxiosInstance } from "axios"; 

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", 
  withCredentials: true, 
});

// guarda el CSRF que manda el backend en cada respuesta
api.interceptors.response.use((response) => {
  const csrfToken = response.headers["x-csrf-token"] as string | undefined;
  if (csrfToken) {
    api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  }
  return response;
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

// Funciones de consulta específicas
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


const httpService = {
    getPuntajesPorDisciplina,
    getMedalRows,
    getDisciplineRows,
    loginUser,
};

export default httpService;
