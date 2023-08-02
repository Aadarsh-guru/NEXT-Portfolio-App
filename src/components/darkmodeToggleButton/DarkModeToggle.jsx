"use client"
import { useData } from "@/context/DataProvider";
import styles from "./darkModeToggle.module.css";


const DarkModeToggle = () => {

    const { theme, setTheme } = useData()

    return (
        <div className={styles.container} onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div
                className={styles.ball}
                style={theme === "light" ? { left: "2px" } : { right: "2px" }}
            />
        </div>
    );
};

export default DarkModeToggle;