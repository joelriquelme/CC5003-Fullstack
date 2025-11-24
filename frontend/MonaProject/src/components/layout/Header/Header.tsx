import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/images/logo-mona.png";
import { useAuthStore } from "../../../store/authStore";

export type TabName =
  | "Calendario"
  | "Medallas"
  | "Puntajes"
  | "Disciplinas"
  | "Admin"
  | "None";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName | "None">("None");
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  React.useEffect(() => {
    if (location.pathname.includes("calendario")) setActiveTab("Calendario");
    else if (location.pathname.includes("medallero")) setActiveTab("Medallas");
    else if (location.pathname.includes("puntajes")) setActiveTab("Puntajes");
    else if (location.pathname.includes("disciplinas")) setActiveTab("Disciplinas");
    else if (location.pathname.includes("admin")) setActiveTab("Admin");
    else setActiveTab("None");
  }, [location.pathname]);

  const showAdmin = Boolean(
    user &&
      (
        (typeof user.username === "string" && user.username.toLowerCase().includes("admin"))
      )
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="La Mona" className={styles.logo} />
        <h1 className={styles.siteTitle}>La Mona</h1>
      </div>

      {user && (
        <nav className={styles.navContainer}>
          <div className={styles.navButtons}>
            <Link
              to="/calendario"
              className={`${styles.navButton} ${
                activeTab === "Calendario" ? styles.active : ""
              }`}
            >
              Calendario
            </Link>

            <Link
              to="/medallero"
              className={`${styles.navButton} ${
                activeTab === "Medallas" ? styles.active : ""
              }`}
            >
              Medallas
            </Link>

            <Link
              to="/puntajes"
              className={`${styles.navButton} ${
                activeTab === "Puntajes" ? styles.active : ""
              }`}
            >
              Puntajes
            </Link>

            <Link
              to="/disciplinas"
              className={`${styles.navButton} ${
                activeTab === "Disciplinas" ? styles.active : ""
              }`}
            >
              Disciplinas
            </Link>

            {showAdmin && (
              <Link
                to="/admin"
                className={`${styles.navButton} ${
                  activeTab === "Admin" ? styles.active : ""
                }`}
              >
                Admin
              </Link>
            )}

            <button className={styles.logoutButton} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
