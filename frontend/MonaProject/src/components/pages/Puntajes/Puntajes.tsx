import React, { useMemo, useState, useEffect } from "react"; 
import DataTable, { type TableColumn } from "react-data-table-component";
import styles from "./Puntajes.module.css";
import type { StandingRow } from "../../../services/httpService";
import httpService from "../../../services/httpService";

// Agregado por carrera/departamento
interface TableRow {
  code: string;
  name: string;
  PJ: number;
  PG: number;
  PE: number;
  PP: number;
  Pts: number;
}

// Función para agregar los datos por carrera/departamento 
function aggregate(rows: StandingRow[]): TableRow[] {
  const map = new Map<string, TableRow>();
  for (const r of rows) {
    if (!map.has(r.code)) {
      map.set(r.code, {
        code: r.code,
        name: r.name,
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        Pts: 0,
      });
    }
    const it = map.get(r.code)!;
    it.PJ += r.PJ;
    it.PG += r.PG;
    it.PE += r.PE;
    it.PP += r.PP;
  }
  for (const it of map.values()) {
    it.Pts = it.PG * 3 + it.PE * 1;
  }
  return [...map.values()];
}

const makeColumns = (): TableColumn<TableRow>[] => [
  {
    name: "Rank",
    selector: (_row, idx) => (idx !== undefined ? idx + 1 : "-"),
    width: "70px",
    center: true,
    cell: (_row, index) => {
      let bg = "transparent",
        color = "inherit";
      if (index === 0) {
        bg = "#FFD700"; // Oro
        color = "#fff";
      } // Lugares. oro
      else if (index === 1) {
        bg = "#C0C0C0"; // Plata
        color = "#fff";
      } // plata
      else if (index === 2) {
        bg = "#CD7F32"; // Bronce
        color = "#fff";
      } // bronce
      return (
        <span
          style={{
            fontWeight: "bold",
            color,
            background: bg,
            borderRadius: 6,
            padding: "4px 10px",
            display: "inline-block",
          }}
        >
          {index !== undefined ? index + 1 : "-"}
        </span>
      );
    },
    sortable: false,
    grow: 0.5,
  },
  {
    name: "Carrera",
    selector: (r) => r.name,
    minWidth: "220px",
    sortable: true,
    cell: (r) => (
      <div className={styles.conCell}>
        <span className={styles.countryCode}>{r.code}</span>
        <span className={styles.countryName}>{r.name}</span>
      </div>
    ),
  },
  {
    name: <span title="Partidos Jugados">PJ</span>,
    selector: (r) => r.PJ,
    center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: <span title="Partidos Ganados">PG</span>,
    selector: (r) => r.PG,
    center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: <span title="Partidos Empatados">PE</span>,
    selector: (r) => r.PE,
    center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: <span title="Partidos Perdidos">PP</span>,
    selector: (r) => r.PP,
    center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: "Puntos",
    selector: (r) => r.Pts,
    center: true,
    sortable: true,
    width: "100px",
    cell: (r) => <span className={styles.pointsCell}>{r.Pts}</span>,
  },
];

const Puntajes: React.FC = () => {
  const [standingRows, setStandingRows] = useState<StandingRow[]>([]);
  const [discipline, setDiscipline] = useState<string>("Todas");

  useEffect(() => {
    const fetchPuntajes = async () => {
      try {
        const data = await httpService.getPuntajesPorDisciplina();
        if (Array.isArray(data)) {
          setStandingRows(data); 
        }
      } catch (error) {
        console.error("Error fetching puntajes data:", error);
      }
    };
    
    fetchPuntajes();
  }, []); 

  const disciplines = useMemo(() => {
    const set = new Set(standingRows.map((r) => r.discipline));
    return ["Todas", ...Array.from(set)];
  }, [standingRows]);

  const tableData = useMemo(() => {
    const filtered =
      discipline === "Todas"
        ? standingRows 
        : standingRows.filter((r) => r.discipline === discipline);

    const aggregated = aggregate(filtered);

    return aggregated.sort(
      (a, b) => b.Pts - a.Pts || a.name.localeCompare(b.name)
    );
  }, [discipline, standingRows]);

  const columns = useMemo(() => makeColumns(), []);

  if (standingRows.length === 0) {
    return (
      <div className={styles.puntajesContainer}>
        <h1 className={styles.puntajesTitle}>Tabla de Puntajes</h1>
        <p>Cargando datos o la base de datos está vacía. ¡Inserta Partidos en tu API!</p>
      </div>
    );
  }

  return (
    <div className={styles.puntajesContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.puntajesTitle}>Tabla de Puntajes</h1>
        <div className={styles.filters}>
          <label className={styles.filterLabel}>Disciplina</label>
          <select
            className={styles.select}
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {discipline !== "Todas" && (
        <h2 className={styles.subTitle}>Disciplina: {discipline}</h2>
      )}

      <div className={styles.tableContainer}>
        <DataTable
          columns={columns}
          data={tableData}
          highlightOnHover
          striped
          responsive
          defaultSortFieldId={9}
          noDataComponent="No hay datos"
        />
      </div>
    </div>
  );
};

export default Puntajes;