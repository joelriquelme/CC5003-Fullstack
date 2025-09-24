import React, { useState } from "react";
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

const sampleDisciplines: DisciplineRow[] =
  await httpService.getDisciplineRows();

const iconMap = {
  Fútbol: <GiSoccerBall />,
  Tenis: <GiTennisRacket />,
  Básquetbol: <GiBasketballBall />,
  Natación: <GiWaterSplash />,
  "Taca-Taca": <GiTabletopPlayers />,
};

const Disciplinas: React.FC = () => {
  const [filter, setFilter] = useState<string>("Todas");

  const options = ["Todas", ...sampleDisciplines.map((d) => d.name)];
  const filteredData =
    filter === "Todas"
      ? sampleDisciplines
      : sampleDisciplines.filter((d) => d.name === filter);

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
