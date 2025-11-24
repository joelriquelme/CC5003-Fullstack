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
      
      // Guardar en el store (esto también guarda en localStorage)
      login(data.user, data.token);
      
      // Redirigir después de un pequeño delay para asegurar que el store se actualice
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#ff0000',
          marginBottom: '30px'
        }}>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <label htmlFor="username" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#999' : '#0066cc',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>

        {error && (
          <p style={{
            color: 'red',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            {error}
          </p>
        )}

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#666'
        }}>
          ¿No tienes cuenta?{" "}
          <a href="/register" style={{
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}