import "./App.css";
import Header from "./components/layout/Header/Header";
import Medallero from "./components/pages/Medallero/Medallero";
import Puntajes from "./components/pages/Puntajes/Puntajes";
import Disciplinas from "./components/pages/Disciplinas/Disciplinas";
import Calendario from "./components/pages/Calendario/Calendario";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import PrivateRoute from "./services/PrivateRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/calendario" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
    </BrowserRouter>
  );
}

export default App;
