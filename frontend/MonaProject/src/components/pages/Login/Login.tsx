import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/httpService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate("/disciplinas"); // redirige si inicia sesión correctamente
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-64 text-center"
      >
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
        <button className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
