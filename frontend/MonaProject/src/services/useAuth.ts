import { useEffect } from "react";
import { api } from "./httpService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, token, loading, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .get("/auth/me")
      .then((res) => {
        login(res.data.user, res.data.token);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, token, loading, login, logout };
}
