import React, { useState, useEffect} from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import styles from "./Medallero.module.css";
import httpService from "../../../services/httpService";
import type { MedalRow } from "../../../services/httpService";

const columns: TableColumn<MedalRow>[] = [
  {
    name: "Rank",
    selector: (_row, index) => (index !== undefined ? index + 1 : "-"),
    cell: (_row, index) => {
      let bg = "transparent";
      let color = "inherit";
      if (index === 0) { bg = "#FFD700"; color = "#fff"; }
      else if (index === 1) { bg = "#C0C0C0"; color = "#fff"; }
      else if (index === 2) { bg = "#CD7F32"; color = "#fff"; }

      return (
        <span style={{
          fontWeight: "bold",
          color, background: bg, borderRadius: 6,
          padding: "4px 10px", display: "inline-block"
        }}>
          {index !== undefined ? index + 1 : "-"}
        </span>
      );
    },
    width: "70px",
    center: true,
    sortable: false,
  },
  {
    name: "Carrera",
    selector: (row) => row.name,
    minWidth: "220px",
    cell: (row) => (
      <div className={styles.conCell}>
        <span className={styles.countryCode}>{row.code}</span>
        <span className={styles.countryName}>{row.name}</span>
      </div>
    ),
    sortable: true,
    wrap: true,
  },
  { name: "Oro",    selector: (row) => row.gold,   center: true, sortable: true, width: "80px"  },
  { name: "Plata",  selector: (row) => row.silver, center: true, sortable: true, width: "80px"  },
  { name: "Bronce", selector: (row) => row.bronze, center: true, sortable: true, width: "110px" },
  {
    name: "Puntos",
    selector: (row) => row.points,
    center: true,
    sortable: true,
    width: "100px",
    cell: (row) => <span className={styles.pointsCell}>{row.points}</span>,
  },
];

const customStyles = {
  headCells: {
    style: { fontWeight: 700, paddingTop: "12px", paddingBottom: "12px" },
  },
  cells: {
    style: { paddingTop: "12px", paddingBottom: "12px" },
  },
};

const conditionalRowStyles = [
  {
    when: (_row: MedalRow, index?: number) => index === 0,
    style: { backgroundColor: "#fff9e6" },
  },
  {
    when: (_row: MedalRow, index?: number) => index === 1,
    style: { backgroundColor: "#f8f9fa" },
  },
  {
    when: (_row: MedalRow, index?: number) => index === 2,
    style: { backgroundColor: "#fff4e6" },
  },
];

const Medallero: React.FC = () => {
  const [data, setData] = useState<MedalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const rows = await httpService.getMedalRows();
        const normalized = Array.isArray(rows)
          ? rows.map((r: any) => ({
              ...r,
              gold: Number(r.gold ?? 0),
              silver: Number(r.silver ?? 0),
              bronze: Number(r.bronze ?? 0),
              points: Number(r.points ?? 0),
            }))
          : [];
        const sorted = normalized.sort((a, b) => b.points - a.points);
        if (active) setData(sorted);
      } catch {
        if (active) setError("Error cargando medallero");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className={styles.medalleroContainer}>
      <h1 className={styles.medalleroTitle}>Medallero Universitario</h1>

      <div className={styles.tableContainer}>
        {error && <p className={styles.error}>{error}</p>}

        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          progressPending={loading}
          noDataComponent="No hay datos"
          highlightOnHover
          striped
          responsive
          defaultSortFieldId={6} 
        />
      </div>

      <div className={styles.tableFooter}>
        * Ordenado por puntos de mayor a menor.
      </div>
    </div>
  );
};

export default Medallero;
