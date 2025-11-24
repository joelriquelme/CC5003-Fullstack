import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Admin.module.css";
import { api } from "../../../services/httpService";
import { useAuth } from "../../../services/useAuth";

export default function AdminPanel() {
  const { user, loading } = useAuth();
  console.log("AdminPanel user:", user);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Department (medalTable)
  const [deptCode, setDeptCode] = useState("");
  const [deptName, setDeptName] = useState("");
  // Changed numeric states to string so placeholders are visible
  const [gold, setGold] = useState<string>("");
  const [silver, setSilver] = useState<string>("");
  const [bronze, setBronze] = useState<string>("");
  const [points, setPoints] = useState<string>("");

  // Discipline
  const [discName, setDiscName] = useState("");
  const [discIcon, setDiscIcon] = useState("Fútbol");
  const [discDays, setDiscDays] = useState("");

  // Puntajes (formato: code, name, discipline, PJ, PG, PE, PP)
  const [pCode, setPCode] = useState("");
  const [pName, setPName] = useState("");
  const [pDiscipline, setPDiscipline] = useState("");
  // Changed numeric states to string so placeholders are visible
  const [PJ, setPJ] = useState<string>("");
  const [PG, setPG] = useState<string>("");
  const [PE, setPE] = useState<string>("");
  const [PP, setPP] = useState<string>("");


  const submitDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null); setError(null);
    try {
      // Convert numeric strings to numbers, default 0 si vacíos
      const body = {
        code: deptCode,
        name: deptName,
        gold: Number(gold) || 0,
        silver: Number(silver) || 0,
        bronze: Number(bronze) || 0,
        points: Number(points) || 0
      };
      await api.post("/medalTable", body);
      setStatus("Departamento creado");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando departamento");
    }
  };

  const submitDiscipline = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null); setError(null);
    try {
      const days = discDays.split(",").map(s => s.trim()).filter(Boolean);
      const body = { name: discName, icon: discIcon, days };
      await api.post("/disciplinas", body);
      setStatus("Disciplina creada");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando disciplina");
    }
  };

  const submitPuntaje = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null); setError(null);
    try {
      // Convert PJ/PG/PE/PP a números antes de enviar
      const body = {
        code: pCode,
        name: pName,
        discipline: pDiscipline,
        PJ: Number(PJ) || 0,
        PG: Number(PG) || 0,
        PE: Number(PE) || 0,
        PP: Number(PP) || 0
      };
      await api.post("/puntajesPorDisciplina", body);
      setStatus("Registro de puntaje creado");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando puntaje");
    }
  };

  // add vertical field style
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" };

  if (loading) return <p>Cargando sesión...</p>;
  if (!user) return <Navigate to="/login" replace />;
  console.log("1 AdminPanel user:", user);

  return (
    <div className={styles.container}>
      <h1>Panel de administración CDI</h1>
      <p>Bienvenido. Desde aquí puedes agregar departamentos, disciplinas y puntajes.</p>

      <section className={styles.card}>
        <h2>Crear Departamento</h2>
        <form onSubmit={submitDepartment} className={styles.form}>
          <div style={fieldStyle}>
            <label htmlFor="deptCode">Código (ING)</label>
            <input id="deptCode" value={deptCode} onChange={e => setDeptCode(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="deptName">Nombre</label>
            <input id="deptName" value={deptName} onChange={e => setDeptName(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="gold">Gold</label>
            <input id="gold" type="number" min={0} value={gold} onChange={e => setGold(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="silver">Silver</label>
            <input id="silver" type="number" min={0} value={silver} onChange={e => setSilver(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="bronze">Bronze</label>
            <input id="bronze" type="number" min={0} value={bronze} onChange={e => setBronze(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="points">Points</label>
            <input id="points" type="number" min={0} value={points} onChange={e => setPoints(e.target.value)} />
          </div>

          <button type="submit">Crear Departamento</button>
        </form>
      </section>

      <section className={styles.card}>
        <h2>Crear Disciplina</h2>
        <form onSubmit={submitDiscipline} className={styles.form}>
          <div style={fieldStyle}>
            <label htmlFor="discName">Nombre disciplina</label>
            <input id="discName" value={discName} onChange={e => setDiscName(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="discIcon">Ícono / Tipo</label>
            <select id="discIcon" value={discIcon} onChange={e => setDiscIcon(e.target.value)}>
              <option>Fútbol</option>
              <option>Tenis</option>
              <option>Básquetbol</option>
              <option>Natación</option>
              <option>Taca-Taca</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label htmlFor="discDays">Días (coma separado: Lun 01, Mar 02)</label>
            <input id="discDays" value={discDays} onChange={e => setDiscDays(e.target.value)} />
          </div>

          <button type="submit">Crear Disciplina</button>
        </form>
      </section>

      <section className={styles.card}>
        <h2>Crear Puntaje por Disciplina</h2>
        <form onSubmit={submitPuntaje} className={styles.form}>
          <div style={fieldStyle}>
            <label htmlFor="pCode">Código carrera (ING)</label>
            <input id="pCode" value={pCode} onChange={e => setPCode(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="pName">Nombre carrera</label>
            <input id="pName" value={pName} onChange={e => setPName(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="pDiscipline">Disciplina</label>
            <input id="pDiscipline" value={pDiscipline} onChange={e => setPDiscipline(e.target.value)} required />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="PJ">PJ</label>
            <input id="PJ" type="number" min={0} value={PJ} onChange={e => setPJ(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="PG">PG</label>
            <input id="PG" type="number" min={0} value={PG} onChange={e => setPG(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="PE">PE</label>
            <input id="PE" type="number" min={0} value={PE} onChange={e => setPE(e.target.value)} />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="PP">PP</label>
            <input id="PP" type="number" min={0} value={PP} onChange={e => setPP(e.target.value)} />
          </div>

          <button type="submit">Crear Puntaje</button>
        </form>
      </section>

      {status && <p className={styles.success}>{status}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}