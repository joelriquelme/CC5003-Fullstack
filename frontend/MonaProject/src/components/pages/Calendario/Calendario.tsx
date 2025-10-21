import React, { useState, useEffect } from "react"; 
import styles from "./Calendario.module.css";
import {
  GiSoccerBall,
  GiTennisRacket,
  GiBasketballBall,
  GiWaterSplash,
  GiTabletopPlayers,
} from "react-icons/gi";
import httpService, { type DisciplineRow } from "../../../services/httpService"; 

const iconMap = {
  Fútbol: <GiSoccerBall />,
  Tenis: <GiTennisRacket />,
  Básquetbol: <GiBasketballBall />,
  Natación: <GiWaterSplash />,
  "Taca-Taca": <GiTabletopPlayers />,
};

const days = [
  "Mié 18", "Jue 19", "Vie 20", "Sáb 21", "Dom 22", "Lun 23", "Mar 24",
  "Mié 25", "Jue 26", "Vie 27", "Sáb 28", "Dom 29", "Lun 30", "Mar 31",
  "Mié 01", "Jue 02", "Vie 03", "Sáb 04",
];


const Calendario: React.FC = () => {
  const [disciplines, setDisciplines] = useState<DisciplineRow[]>([]);
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const [openDiscipline, setOpenDiscipline] = useState<string | null>(null); 

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await httpService.getDisciplineRows();
        if (Array.isArray(data)) {
          setDisciplines(data);
        }
      } catch (error) {
        console.error("Error fetching calendario data:", error);
      }
    };
    
    fetchDisciplines();
  }, []); 

  const toggleDiscipline = (id: string) => { 
    setOpenDiscipline(openDiscipline === id ? null : id);
  };

  if (disciplines.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Calendario de Competencias</h1>
        <p>Cargando datos o no hay disciplinas disponibles.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calendario de Competencias</h1>

      <div className={styles.daysContainer}>
        {days.map((day) => (
          <button
            key={day}
            className={`${styles.dayButton} ${
              activeDay === day ? styles.active : ""
            }`}
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
                <span className={styles.icon}>{iconMap[discipline.icon]}</span>
                <span>{discipline.name}</span>
                <span className={styles.arrow}>
                  {openDiscipline === discipline.id ? "▲" : "▼"} // 
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