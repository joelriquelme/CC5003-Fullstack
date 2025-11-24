import "bootstrap/dist/css/bootstrap.min.css";
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
import AdminPanel from "./components/pages/Admin/Admin";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/calendario" replace /> : <Navigate to="/login" replace />}
        />
        
        <Route 
          path="/login" 
          element={user ? <Navigate to="/calendario" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/calendario" replace /> : <Register />} 
        />

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
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;