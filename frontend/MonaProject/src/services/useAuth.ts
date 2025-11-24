import { useEffect } from "react";
import { api } from "./httpService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, token, loading, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    // Solo verificar con el backend si NO hay usuario en el store
    if (!user) {
      setLoading(true);

      api
        .get("/auth/me")
        .then((res) => {
          // Si el backend responde con un usuario, actualizar el store
          login(res.data.user, token ?? "");
        })
        .catch(() => {
          // Si falla, hacer logout para limpiar cualquier dato inválido
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Si ya hay usuario, marcar como no loading
      setLoading(false);
    }
  }, []); // Solo ejecutar una vez al montar

  return { user, token, loading, login, logout };
}