import { create } from "zustand";

interface AuthState {
  user: null | { id: string; username: string };
  token: string | null;
  loading: boolean;

  login: (user: any, token: string) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  login: (user, token) =>
    set({
      user,
      token,
      loading: false,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      loading: false,
    }),

  setLoading: (value) => set({ loading: value }),
}));
