import React, { useState, useEffect } from 'react';
import styles from './Medallero.module.css';

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

const Medallero: React.FC = () => {
    const [data, setData] = useState<DepartmentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Simular la obtención de datos
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

    if (loading) {
        return (
            <div className={styles.medalleroContainer}>
                <div className={styles.loading}>Cargando medallero...</div>
            </div>
        );
    }

    return (
        <div className={styles.medalleroContainer}>
            <h1 className={styles.medalleroTitle}>Medallero Universitario</h1>

            <div className={styles.tableContainer}>
                <table className={styles.medalleroTable}>
                    <thead>
                    <tr>
                        <th className={styles.rankHeader}>Rank</th>
                        <th className={styles.conHeader}>Carrera</th>
                        <th className={styles.medalHeader}>Oro</th>
                        <th className={styles.medalHeader}>Plata</th>
                        <th className={styles.medalHeader}>Bronce</th>
                        <th className={styles.totalHeader}>Total</th>
                        <th className={styles.pointsHeader}>Puntos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        const rowClass = index < 3 ? styles[`top${index + 1}`] : '';
                        return (
                            <tr key={item.code} className={rowClass}>
                                <td className={styles.rankCell}>{index + 1}</td>
                                <td className={styles.conCell}>
                                    <span className={styles.countryCode}>{item.code}</span>
                                    <span className={styles.countryName}>{item.name}</span>
                                </td>
                                <td className={`${styles.medalCell} ${styles.gold}`}>{item.medals.gold}</td>
                                <td className={`${styles.medalCell} ${styles.silver}`}>{item.medals.silver}</td>
                                <td className={`${styles.medalCell} ${styles.bronze}`}>{item.medals.bronze}</td>
                                <td className={styles.totalCell}>{item.total}</td>
                                <td className={styles.pointsCell}>{item.points}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Medallero;