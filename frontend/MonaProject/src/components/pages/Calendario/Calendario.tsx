import React, { useState } from "react";
import styles from "./Calendario.module.css";

import { GiSoccerBall, GiTennisRacket, GiBasketballBall, GiWaterSplash, GiTabletopPlayers } from "react-icons/gi";

interface Discipline {
  id: number;
  name: string;
  days: string[];
  icon: React.ReactNode;
}

const disciplines: Discipline[] = [
  { id: 1, name: "Baby Masculino", days: ["Mié 01", "Jue 02", "Vie 03"], icon: <GiSoccerBall /> },
  { id: 2, name: "Baby Femenino", days: ["Vie 03", "Sáb 04"], icon: <GiSoccerBall /> },
  { id: 3, name: "Natación", days: ["Mar 31", "Jue 02"], icon: <GiWaterSplash /> },
  { id: 4, name: "Tenis", days: ["Dom 29", "Lun 30", "Mar 31", "Mié 01"], icon: <GiTennisRacket /> },
  { id: 5, name: "Básquetbol Masculino", days: ["Sáb 21", "Dom 22", "Lun 23", "Mar 24"], icon: <GiBasketballBall /> },
  { id: 6, name: "Taca-Taca", days: ["Mié 18", "Jue 19", "Vie 20", "Sáb 21", "Dom 22"], icon: <GiTabletopPlayers /> },
];

const days = [
  "Mié 18", "Jue 19", "Vie 20", "Sáb 21", "Dom 22", "Lun 23", "Mar 24",
  "Mié 25", "Jue 26", "Vie 27", "Sáb 28", "Dom 29", "Lun 30", "Mar 31",
  "Mié 01", "Jue 02", "Vie 03", "Sáb 04"
];

const Calendario: React.FC = () => {
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const [openDiscipline, setOpenDiscipline] = useState<number | null>(null);

  const toggleDiscipline = (id: number) => {
    setOpenDiscipline(openDiscipline === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calendario de Competencias</h1>

      <div className={styles.daysContainer}>
        {days.map((day) => (
          <button
            key={day}
            className={`${styles.dayButton} ${activeDay === day ? styles.active : ""}`}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className={styles.disciplinesContainer}>
        {disciplines
          .filter((d) => d.days.includes(activeDay))
          .map((discipline) => (
            <div key={discipline.id} className={styles.card}>
              <div
                className={styles.cardHeader}
                onClick={() => toggleDiscipline(discipline.id)}
              >
                <span className={styles.icon}>{discipline.icon}</span>
                <span>{discipline.name}</span>
                <span className={styles.arrow}>
                  {openDiscipline === discipline.id ? "▲" : "▼"}
                </span>
              </div>
              {openDiscipline === discipline.id && (
                <div className={styles.cardBody}>
                  {discipline.days.map((d, idx) => (
                    <span key={idx} className={styles.dayTag}>
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendario;
