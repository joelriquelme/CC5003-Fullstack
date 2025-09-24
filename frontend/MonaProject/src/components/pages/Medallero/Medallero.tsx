import React, { useState, useEffect } from "react";
import styles from "./Medallero.module.css";
import DataTable, { type TableColumn } from "react-data-table-component";
import type { MedalRow } from "../../../services/httpService";
import httpService from "../../../services/httpService";

const columns: TableColumn<MedalRow>[] = [
  {
    name: "Rank",
    selector: (_row, index) => (index !== undefined ? index + 1 : "-"),
    cell: (_row, index) => {
      let bg = "transparent";
      let color = "inherit";
      if (index === 0) {
        bg = "#FFD700";
        color = "#fff";
      } else if (index === 1) {
        bg = "#C0C0C0";
        color = "#fff";
      } else if (index === 2) {
        bg = "#CD7F32";
        color = "#fff";
      }

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
    width: "70px",
    center: true,
  },
  {
    name: "Carrera",
    selector: (row: MedalRow) => row.name,
    minWidth: "220px",
    cell: (row: MedalRow) => (
      <div className={styles.conCell}>
        <span className={styles.countryCode}>{row.code}</span>
        <span className={styles.countryName}>{row.name}</span>
      </div>
    ),
    sortable: true,
    wrap: true,
  },
  {
    name: "Oro",
    selector: (row: MedalRow) => row.gold,
    center: true,
    sortable: true,
    width: "80px",
  },
  {
    name: "Plata",
    selector: (row: MedalRow) => row.silver,
    center: true,
    sortable: true,
    width: "80px",
  },
  {
    name: "Bronce",
    selector: (row: MedalRow) => row.bronze,
    center: true,
    sortable: true,
    width: "110px",
  },
  {
    name: "Puntos",
    selector: (row: MedalRow) => row.points,
    center: true,
    sortable: true,
    width: "100px",
    cell: (row: MedalRow) => (
      <span className={styles.pointsCell}>{row.points}</span>
    ),
  },
];

const Medallero: React.FC = () => {
  const [data, setData] = useState<MedalRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const sortedData = await httpService.getMedalRows();
        if (active) setData(sortedData);
      } catch (err: any) {
        setError("Error cargando medallero");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.medalleroContainer}>
      <h1 className={styles.medalleroTitle}>Medallero Universitario</h1>
      <div className={styles.tableContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          noDataComponent="No hay datos"
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default Medallero;
