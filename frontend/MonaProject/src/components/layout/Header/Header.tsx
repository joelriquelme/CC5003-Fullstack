import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/images/logo-mona.png";

export type TabName = "Calendario" | "Medallas" | "Puntajes" | "Disciplinas" | "None";

export interface HeaderProps {
  initialActiveTab?: TabName | "None";
}

const Header: React.FC<HeaderProps> = ({ initialActiveTab = "None" }) => {
  const [activeTab, setActiveTab] = useState<TabName | "None">(initialActiveTab);
  const location = useLocation();

  // 🔹 Actualiza el tab activo según la ruta actual
  React.useEffect(() => {
    if (location.pathname.includes("calendario")) setActiveTab("Calendario");
    else if (location.pathname.includes("medallero")) setActiveTab("Medallas");
    else if (location.pathname.includes("puntajes")) setActiveTab("Puntajes");
    else if (location.pathname.includes("disciplinas")) setActiveTab("Disciplinas");
    else setActiveTab("None");
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="La Mona" className={styles.logo} />
        <h1 className={styles.siteTitle}>La Mona</h1>
      </div>

      {/* 🔹 Barra de navegación */}
      <nav className={styles.navContainer}>
        <div className={styles.navButtons}>
          <Link
            to="/calendario"
            className={`${styles.navButton} ${activeTab === "Calendario" ? styles.active : ""}`}
            onClick={() => setActiveTab("Calendario")}
          >
            Calendario
          </Link>

          <Link
            to="/medallero"
            className={`${styles.navButton} ${activeTab === "Medallas" ? styles.active : ""}`}
            onClick={() => setActiveTab("Medallas")}
          >
            Medallas
          </Link>

          <Link
            to="/puntajes"
            className={`${styles.navButton} ${activeTab === "Puntajes" ? styles.active : ""}`}
            onClick={() => setActiveTab("Puntajes")}
          >
            Puntajes
          </Link>

          <Link
            to="/disciplinas"
            className={`${styles.navButton} ${activeTab === "Disciplinas" ? styles.active : ""}`}
            onClick={() => setActiveTab("Disciplinas")}
          >
            Disciplinas
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
