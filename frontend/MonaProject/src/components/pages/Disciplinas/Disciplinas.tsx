import React, { useState, useEffect, useMemo } from "react"; 
import styles from "./Disciplinas.module.css";
import {
  GiSoccerBall,
  GiTennisRacket,
  GiBasketballBall,
  GiWaterSplash,
  GiTabletopPlayers,
} from "react-icons/gi";
import httpService from "../../../services/httpService";
import type { DisciplineRow } from "../../../services/httpService";

const iconMap = {
  Fútbol: <GiSoccerBall />,
  Tenis: <GiTennisRacket />,
  Básquetbol: <GiBasketballBall />,
  Natación: <GiWaterSplash />,
  "Taca-Taca": <GiTabletopPlayers />,
};

const Disciplinas: React.FC = () => {
  const [disciplines, setDisciplines] = useState<DisciplineRow[]>([]);
  const [filter, setFilter] = useState<string>("Todas");

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await httpService.getDisciplineRows();
        if (Array.isArray(data)) {
          setDisciplines(data);
        } else {
            console.error("La API no devolvió un array:", data);
        }
      } catch (error) {
        console.error("Error fetching disciplines:", error);
      }
    };
    
    fetchDisciplines();
  }, []); 

  const options = useMemo(() => {
        return ["Todas", ...disciplines.map((d) => d.name)];
    }, [disciplines]);

  const filteredData = useMemo(() => {
        return filter === "Todas"
            ? disciplines
            : disciplines.filter((d) => d.name === filter);
    }, [filter, disciplines]);

  if (disciplines.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Disciplinas</h1>
        <p>Cargando datos o la base de datos está vacía. Intenta insertar un dato vía POST en Thunder Client.</p>
      </div>
    );
  }

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
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{iconMap[item.icon]}</span>
              <h2>{item.name}</h2>
            </div>
            <div className={styles.days}>
              {item.days.map((day, idx) => (
                <span key={idx} className={styles.day}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disciplinas;