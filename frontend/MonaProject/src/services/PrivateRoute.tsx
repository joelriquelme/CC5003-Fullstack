import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando sesión...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
