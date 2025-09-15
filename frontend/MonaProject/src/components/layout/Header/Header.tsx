import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/images/logo-mona.png';

export type TabName = 'Calendario' | 'Medallas' | 'Puntajes' | 'Disciplinas';

export interface HeaderProps {
    initialActiveTab?: TabName;
}

const Header: React.FC<HeaderProps> = ({ initialActiveTab = 'Calendario' }) => {
    const [activeTab, setActiveTab] = useState<TabName>(initialActiveTab);

    const handleTabClick = (tabName: TabName) => {
        setActiveTab(tabName);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img
                    src={logo}
                    alt="La Mona"
                    className={styles.logo}
                />
                <h1 className={styles.siteTitle}>La Mona</h1>
            </div>

            {/* Barra de navegación con botones de texto */}
            <nav className={styles.navContainer}>
                <div className={styles.navButtons}>
                    <button
                        className={`${styles.navButton} ${activeTab === 'Calendario' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Calendario')}
                    >
                        Calendario
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'Medallas' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Medallas')}
                    >
                        Medallas
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'Puntajes' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Puntajes')}
                    >
                        Puntajes
                    </button>
                    <button
                        className={`${styles.navButton} ${activeTab === 'Disciplinas' ? styles.active : ''}`}
                        onClick={() => handleTabClick('Disciplinas')}
                    >
                        Disciplinas
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;