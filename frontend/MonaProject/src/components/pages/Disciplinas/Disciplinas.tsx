import React, { useState } from "react";
import styles from "./Disciplinas.module.css";

import { GiSoccerBall, GiTennisRacket, GiBasketballBall, GiWaterSplash, GiTabletopPlayers } from "react-icons/gi";

interface DisciplineRow {
  id: number;
  name: string;
  days: string[];
  icon: React.ReactNode;
}


const sampleDisciplines: DisciplineRow[] = [
  { id: 1, name: "Baby Masculino", days: ["Mié 01", "Jue 02", "Vie 03"], icon: <GiSoccerBall /> },
  { id: 2, name: "Baby Femenino", days: ["Vie 03", "Sáb 04"], icon: <GiSoccerBall /> },
  { id: 3, name: "Natación", days: ["Mar 31", "Jue 02"], icon: <GiWaterSplash /> },
  { id: 4, name: "Tenis", days: ["Dom 29", "Lun 30", "Mar 31", "Mié 01"], icon: <GiTennisRacket /> },
  { id: 5, name: "Básquetbol Masculino", days: ["Sáb 21", "Dom 22", "Lun 23", "Mar 24"], icon: <GiBasketballBall /> },
  { id: 6, name: "Taca-Taca", days: ["Mié 18", "Jue 19", "Vie 20", "Sáb 21", "Dom 22"], icon: <GiTabletopPlayers /> }
];

const Disciplinas: React.FC = () => {
  const [filter, setFilter] = useState<string>("Todas");

  const options = ["Todas", ...sampleDisciplines.map(d => d.name)];
  const filteredData = filter === "Todas"
    ? sampleDisciplines
    : sampleDisciplines.filter(d => d.name === filter);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disciplinas</h1>

      <div className={styles.filters}>
        <label className={styles.filterLabel}>Disciplina:</label>
        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredData.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{item.icon}</span>
              <h2>{item.name}</h2>
            </div>
            <div className={styles.days}>
              {item.days.map((day, idx) => (
                <span key={idx} className={styles.day}>{day}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disciplinas;
