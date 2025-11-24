import { useEffect } from "react";
import { api } from "./httpService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, token, loading, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    if (!user) {
      setLoading(true);

      api
        .get("/auth/me")
        .then((res) => {
          // si el backend responde con un usuario, actualizar el store
          login(res.data.user, token ?? "");
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []); 

  return { user, token, loading, login, logout };
}