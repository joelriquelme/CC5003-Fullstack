import { useEffect, useState } from "react";
import { type StandingRow, getPuntajesPorDisciplina } from "../../../services/httpService";
import styles from "./Puntajes.module.css";

export default function Puntajes() {
  const [rows, setRows] = useState<StandingRow[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("Todas");

  useEffect(() => {
    getPuntajesPorDisciplina().then(setRows).catch(console.error);
  }, []);

  const disciplines = ["Todas", ...Array.from(new Set(rows.map(r => r.discipline)))];

  const filteredRows = selectedDiscipline === "Todas" 
    ? rows 
    : rows.filter(r => r.discipline === selectedDiscipline);

  return (
    <div className={styles.puntajesContainer}>
      <h1 className={styles.puntajesTitle}>Puntajes por Disciplina</h1>
      
      <div className={styles.headerRow}>
        <div className={styles.filters}>
          <span className={styles.filterLabel}>Disciplina:</span>
          <select 
            className={styles.select}
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            {disciplines.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <th style={{ padding: "12px 8px", textAlign: "left" }}>Carrera</th>
              <th style={{ padding: "12px 8px", textAlign: "left" }}>Disciplina</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>PJ</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>PG</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>PE</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>PP</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td className={styles.conCell} style={{ padding: "12px 8px" }}>
                  <span className={styles.countryCode}>{r.code}</span>
                  <span className={styles.countryName}>{r.name}</span>
                </td>
                <td style={{ padding: "12px 8px", textAlign: "left" }}>{r.discipline}</td>
                <td className={styles.pointsCell} style={{ padding: "12px 8px" }}>{r.PJ}</td>
                <td className={styles.pointsCell} style={{ padding: "12px 8px" }}>{r.PG}</td>
                <td className={styles.pointsCell} style={{ padding: "12px 8px" }}>{r.PE}</td>
                <td className={styles.pointsCell} style={{ padding: "12px 8px" }}>{r.PP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}