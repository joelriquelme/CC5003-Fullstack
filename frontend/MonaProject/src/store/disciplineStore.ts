import { create } from "zustand";
import http from "../services/httpService";

interface Discipline {
  id: string;
  name: string;
  days?: string[];
  icon?: string;
}

interface DisciplineState {
  list: Discipline[];
  loading: boolean;
  fetchDisciplines: () => Promise<void>;
}

export const useDisciplineStore = create<DisciplineState>((set) => ({
  list: [],
  loading: false,

  fetchDisciplines: async () => {
    set({ loading: true });
    try {
      const data = await http.getDisciplineRows();
      set({ list: data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
