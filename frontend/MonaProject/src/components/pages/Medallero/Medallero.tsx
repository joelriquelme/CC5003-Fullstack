import React, { useState, useEffect } from 'react';
import styles from './Medallero.module.css';
import DataTable, { type TableColumn} from 'react-data-table-component';

// Interfaces para los datos
interface Medals {
    gold: number;
    silver: number;
    bronze: number;
}

interface DepartmentData {
    code: string;
    name: string;
    medals: Medals;
    total: number;
    points: number;
}

// Datos de ejemplo con códigos de carreras
const sampleData: DepartmentData[] = [
    {
        code: "SIS",
        name: "Ingeniería de Sistemas",
        medals: { gold: 5, silver: 3, bronze: 2 },
        total: 10,
        points: 120
    },
    {
        code: "MED",
        name: "Medicina",
        medals: { gold: 4, silver: 6, bronze: 4 },
        total: 14,
        points: 110
    },
    {
        code: "DER",
        name: "Derecho",
        medals: { gold: 3, silver: 4, bronze: 5 },
        total: 12,
        points: 85
    },
    {
        code: "ADM",
        name: "Administración",
        medals: { gold: 6, silver: 2, bronze: 1 },
        total: 9,
        points: 135
    },
    {
        code: "ARQ",
        name: "Arquitectura",
        medals: { gold: 2, silver: 3, bronze: 4 },
        total: 9,
        points: 65
    },
    {
        code: "PSI",
        name: "Psicología",
        medals: { gold: 1, silver: 5, bronze: 3 },
        total: 9,
        points: 70
    },
    {
        code: "ING",
        name: "Ingeniería Civil",
        medals: { gold: 7, silver: 3, bronze: 2 },
        total: 12,
        points: 140
    },
    {
        code: "ECO",
        name: "Economía",
        medals: { gold: 2, silver: 4, bronze: 3 },
        total: 9,
        points: 60
    },
    {
        code: "COM",
        name: "Comunicación",
        medals: { gold: 3, silver: 2, bronze: 4 },
        total: 9,
        points: 75
    },
    {
        code: "ART",
        name: "Artes",
        medals: { gold: 1, silver: 2, bronze: 3 },
        total: 6,
        points: 40
    }
];

const columns: TableColumn<DepartmentData>[] = [
    {
        name: 'Rank',
        selector: (_row, index) => (index !== undefined ? index + 1 : '-'),
        width: '70px',
        center: true,
        cell: (_row, index) => {
            let bg = 'transparent';
            let color = 'inherit';
            if (index === 0) {
                bg = '#FFD700';
                color = '#fff';
            } else if (index === 1) {
                bg = '#C0C0C0';
                color = '#fff';
            } else if (index === 2) {
                bg = '#CD7F32';
                color = '#fff';
            }
            return (
                <span
                    style={{
                        fontWeight: 'bold',
                        color,
                        background: bg,
                        borderRadius: 6,
                        padding: '4px 10px',
                        display: 'inline-block',
                    }}
                >
                    {index !== undefined ? index + 1 : '-'}
                </span>
            );
        },
        sortable: false,
        grow: 0.5,
    },
    {
        name: 'Carrera',
        selector: row => row.name,
        minWidth: '220px',
        cell: row => (
            <div className={styles.conCell}>
                <span className={styles.countryCode}>{row.code}</span>
                <span className={styles.countryName}>{row.name}</span>
            </div>
        ),
        sortable: true,
        wrap: true,
    },
    {
        name: 'Oro',
        selector: row => row.medals.gold,
        center: true,
        cell: row => (
            <span>{row.medals.gold}</span>
        ),
        sortable: true,
        width: '80px',
    },
    {
        name: 'Plata',
        selector: row => row.medals.silver,
        center: true,
        cell: row => (
            <span>{row.medals.silver}</span>
        ),
        sortable: true,
        width: '80px',
    },
    {
        name: 'Bronce',
        selector: row => row.medals.bronze,
        center: true,
        cell: row => (
            <span>{row.medals.bronze}</span>
        ),
        sortable: true,
        width: '110px',
        minWidth: '110px',
    },
    {
        name: 'Total',
        selector: row => row.total,
        center: true,
        cell: row => <span className={styles.totalCell}>{row.total}</span>,
        sortable: true,
        width: '90px',
    },
    {
        name: 'Puntos',
        selector: row => row.points,
        center: true,
        cell: row => <span className={styles.pointsCell}>{row.points}</span>,
        sortable: true,
        width: '100px',
    },
];

const Medallero: React.FC = () => {
    const [data, setData] = useState<DepartmentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulamos un delay de red
                await new Promise(resolve => setTimeout(resolve, 800));

                // Ordenar por puntos
                const sortedData = [...sampleData].sort((a, b) => b.points - a.points);
                setData(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.medalleroContainer}>
            <h1 className={styles.medalleroTitle}>Medallero Universitario</h1>
            <div className={styles.tableContainer}>
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    noDataComponent="No hay datos"
                    highlightOnHover
                    striped
                    responsive
                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: '#ff0000',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textAlign: 'center',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                lineHeight: '1.3',
                                padding: '12px 6px',
                            },
                        },
                        rows: {
                            style: {
                                fontSize: '0.98rem',
                                minHeight: '48px',
                            },
                        },
                        table: {
                            style: {
                                borderRadius: '8px',
                                overflow: 'hidden',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Medallero;