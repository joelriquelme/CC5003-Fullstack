import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpService from "../../../services/httpService";
import { useAuthStore } from "../../../store/authStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await httpService.loginUser(username, password);

      login(data.user, data.token);

      navigate("/disciplinas"); 
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 text-center">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-blue-500">Regístrate</a>
      </p>
    </div>
  );
}
