import React, { useMemo, useState } from "react"
import DataTable, { type TableColumn } from "react-data-table-component"
import styles from "./Puntajes.module.css"

// Por disciplina y carrera/departamento
interface StandingRow {
  code: string        // abreviatura (ING, MED, etc.)
  name: string        // nombre carrera/depto
  discipline: string  // disciplina 
  PJ: number
  PG: number
  PE: number
  PP: number
}

// Agregado por carrera/departamento
interface TableRow {
  code: string
  name: string
  PJ: number
  PG: number
  PE: number
  PP: number
  Pts: number
}

// Datos de ejemplo
const sampleByDiscipline: StandingRow[] = [
  { code: "ING", name: "Ingeniería Civil", discipline: "Fútbol",  PJ: 5, PG: 3, PE: 1, PP: 1 },
  { code: "MED", name: "Medicina",         discipline: "Fútbol",  PJ: 5, PG: 2, PE: 2, PP: 1},
  { code: "ADM", name: "Administración",   discipline: "Fútbol",  PJ: 5, PG: 2, PE: 1, PP: 2},
  { code: "DER", name: "Derecho",          discipline: "Fútbol",  PJ: 5, PG: 1, PE: 1, PP: 3},

  { code: "ING", name: "Ingeniería Civil", discipline: "Básquetbol", PJ: 4, PG: 3, PE: 0, PP: 1 },
  { code: "MED", name: "Medicina",         discipline: "Básquetbol", PJ: 4, PG: 2, PE: 1, PP: 1 },
  { code: "ADM", name: "Administración",   discipline: "Básquetbol", PJ: 4, PG: 1, PE: 1, PP: 2 },
  { code: "DER", name: "Derecho",          discipline: "Básquetbol", PJ: 4, PG: 1, PE: 0, PP: 3 },

  { code: "SIS", name: "Ingeniería de Sistemas", discipline: "Voleibol", PJ: 6, PG: 4, PE: 0, PP: 2 },
  { code: "MED", name: "Medicina",               discipline: "Voleibol", PJ: 6, PG: 3, PE: 1, PP: 2 },
  { code: "ING", name: "Ingeniería Civil",       discipline: "Voleibol", PJ: 6, PG: 3, PE: 0, PP: 3 },
]

// Función para agregar los datos por carrera/departamento
function aggregate(rows: StandingRow[]): TableRow[] {
  const map = new Map<string, TableRow>()
  for (const r of rows) {
    if (!map.has(r.code)) {
      map.set(r.code, {
        code: r.code,
        name: r.name,
        PJ: 0, PG: 0, PE: 0, PP: 0, Pts: 0,
      })
    }
    const it = map.get(r.code)!
    it.PJ += r.PJ
    it.PG += r.PG
    it.PE += r.PE
    it.PP += r.PP
  }
  for (const it of map.values()) {
    it.Pts = it.PG * 3 + it.PE * 1
  }
  return [...map.values()]
}

// Columnas de la tabla
const makeColumns = (): TableColumn<TableRow>[] => [
  {
    name: "Rank",
    selector: (_row, idx) => (idx !== undefined ? idx + 1 : "-"),
    width: "70px",
    center: true,
    cell: (_row, index) => {
      let bg = "transparent", color = "inherit"
      if (index === 0) { bg = "#FFD700"; color = "#fff" } // Lugares. oro
      else if (index === 1) { bg = "#C0C0C0"; color = "#fff" } // plata
      else if (index === 2) { bg = "#CD7F32"; color = "#fff" } // bronce
      return (
        <span style={{ fontWeight: "bold", color, background: bg, borderRadius: 6, padding: "4px 10px", display: "inline-block" }}>
          {index !== undefined ? index + 1 : "-"}
        </span>
      )
    },
    sortable: false,
    grow: 0.5,
  },
  {
    name: "Carrera",
    selector: r => r.name,
    minWidth: "220px",
    sortable: true,
    cell: r => (
      <div className={styles.conCell}>
        <span className={styles.countryCode}>{r.code}</span>
        <span className={styles.countryName}>{r.name}</span>
      </div>
    ),
  },
  { name: <span title="Partidos Jugados">PJ</span>, selector: r => r.PJ, center: true, sortable: true, width: "70px" },
  { name: <span title="Partidos Ganados">PG</span>, selector: r => r.PG, center: true, sortable: true, width: "70px" },
  { name: <span title="Partidos Empatados">PE</span>, selector: r => r.PE, center: true, sortable: true, width: "70px" },
  { name: <span title="Partidos Perdidos">PP</span>, selector: r => r.PP, center: true, sortable: true, width: "70px" },
  {
    name: "Puntos",
    selector: r => r.Pts,
    center: true,
    sortable: true,
    width: "100px",
    cell: r => <span className={styles.pointsCell}>{r.Pts}</span>,
  },
]

// Componente principal
const Puntajes: React.FC = () => {
  const [discipline, setDiscipline] = useState<string>("Todas")

  const disciplines = useMemo(() => {
    const set = new Set(sampleByDiscipline.map(r => r.discipline))
    return ["Todas", ...Array.from(set)]
  }, [])

  const tableData = useMemo(() => {
    const filtered = discipline === "Todas"
      ? sampleByDiscipline
      : sampleByDiscipline.filter(r => r.discipline === discipline)

    const aggregated = aggregate(filtered)

    return aggregated.sort((a, b) =>
      b.Pts - a.Pts ||
      a.name.localeCompare(b.name)
    )
  }, [discipline])

  const columns = useMemo(() => makeColumns(), [])

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
            {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
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
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#ff0000",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                textAlign: "center",
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: "1.3",
                padding: "12px 6px",
              },
            },
            rows: { style: { fontSize: "0.98rem", minHeight: "48px" } },
            table: { style: { borderRadius: 8, overflow: "hidden" } },
          }}
          noDataComponent="No hay datos"
        />
      </div>
    </div>
  )
}

export default Puntajes
