import { useEffect, useState } from "react";
import { type MedalRow, getMedalRows } from "../../../services/httpService";
import styles from "./Medallero.module.css";

export default function Medallero() {
  const [rows, setRows] = useState<MedalRow[]>([]);

  useEffect(() => {
    getMedalRows().then(setRows).catch(console.error);
  }, []);

  const getTopClass = (index: number) => {
    if (index === 0) return styles.top1;
    if (index === 1) return styles.top2;
    if (index === 2) return styles.top3;
    return "";
  };

  return (
    <div className={styles.medalleroContainer}>
      <h1 className={styles.medalleroTitle}>Medallero General</h1>
      
      <div className={styles.tableContainer}>
        <table className="medalleroTable" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className={styles.rankHeader} style={{ padding: "12px 8px" }}>#</th>
              <th className={styles.conHeader} style={{ padding: "12px 8px", textAlign: "left" }}>Carrera</th>
              <th className={styles.medalHeader} style={{ padding: "12px 8px" }}>🥇</th>
              <th className={styles.medalHeader} style={{ padding: "12px 8px" }}>🥈</th>
              <th className={styles.medalHeader} style={{ padding: "12px 8px" }}>🥉</th>
              <th className={styles.totalHeader} style={{ padding: "12px 8px" }}>Total</th>
              <th className={styles.pointsHeader} style={{ padding: "12px 8px" }}>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, index) => (
              <tr 
                key={r.id} 
                className={getTopClass(index)}
                style={{ borderBottom: "1px solid #dee2e6" }}
              >
                <td className={styles.rankCell} style={{ padding: "12px 8px" }}>
                  {index + 1}
                </td>
                <td className={styles.conCell} style={{ padding: "12px 8px" }}>
                  <span className={styles.countryCode}>{r.code}</span>
                  <span className={styles.countryName}>{r.name}</span>
                </td>
                <td className={`${styles.medalCell} ${styles.gold}`} style={{ padding: "12px 8px" }}>
                  {r.gold}
                </td>
                <td className={`${styles.medalCell} ${styles.silver}`} style={{ padding: "12px 8px" }}>
                  {r.silver}
                </td>
                <td className={`${styles.medalCell} ${styles.bronze}`} style={{ padding: "12px 8px" }}>
                  {r.bronze}
                </td>
                <td className={styles.totalCell} style={{ padding: "12px 8px" }}>
                  {r.gold + r.silver + r.bronze}
                </td>
                <td className={styles.pointsCell} style={{ padding: "12px 8px" }}>
                  {r.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}