import { create } from "zustand";

interface AuthState {
  user: null | { id: string; username: string };
  token: string | null;
  loading: boolean;

  login: (user: any, token: string) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("auth");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading auth from storage:", error);
  }
  return { user: null, token: null };
};

export const useAuthStore = create<AuthState>((set) => {
  const initial = loadFromStorage();
  
  return {
    user: initial.user || null,
    token: initial.token || null,
    loading: true,

    login: (user, token) => {
      localStorage.setItem("auth", JSON.stringify({ user, token }));
      set({ user, token, loading: false });
    },

    logout: () => {
      localStorage.removeItem("auth");
      set({ user: null, token: null, loading: false });
    },

    setLoading: (value) => set({ loading: value }),
  };
});