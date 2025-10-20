import "./App.css";
import Header from "./components/layout/Header/Header";
import Medallero from "./components/pages/Medallero/Medallero";
import Puntajes from "./components/pages/Puntajes/Puntajes";
import Disciplinas from "./components/pages/Disciplinas/Disciplinas";
import Calendario from "./components/pages/Calendario/Calendario";
import Login from "./components/pages/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";
import type { ReactElement } from "react";

const EmptyContent = () => <div className="mainContent" style={{ minHeight: "50vh" }}></div>;

// 🔒 RUTA PROTEGIDA
function PrivateRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ textAlign: "center" }}>Cargando sesión...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EmptyContent />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/calendario"
          element={
            <PrivateRoute>
              <Calendario />
            </PrivateRoute>
          }
        />
        <Route
          path="/medallero"
          element={
            <PrivateRoute>
              <Medallero />
            </PrivateRoute>
          }
        />
        <Route
          path="/puntajes"
          element={
            <PrivateRoute>
              <Puntajes />
            </PrivateRoute>
          }
        />
        <Route
          path="/disciplinas"
          element={
            <PrivateRoute>
              <Disciplinas />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
