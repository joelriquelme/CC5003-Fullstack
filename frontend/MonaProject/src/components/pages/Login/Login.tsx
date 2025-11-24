import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../../../services/httpService";
import { useAuthStore } from "../../../store/authStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await httpService.loginUser(username, password);
      login(data.user, data.token);

      setTimeout(() => {
        navigate("/calendario");
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        {error && <p>{error}</p>}

        <p>
          ¿No tienes cuenta?{" "}
          <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
