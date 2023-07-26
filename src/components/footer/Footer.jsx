'use client'
import React from "react";
import styles from "./footer.module.css";
import { Instagram, Language, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <p className={styles.copy}  >©2023 Aaadarsh Guru. All rights reserved.</p>
        </a>
      </div>
      <div className={styles.social}>
        <a href="https://twitter.com/Aadarsh_guru" target="_blank" rel="noopener noreferrer"><Twitter className={styles.icon} /></a>
        <a href="https://aadarshguru.com" target="_blank" rel="noopener noreferrer"><Language className={styles.icon} /></a>
        <a href="https://instagram.com/aadarsh_guru" target="_blank" rel="noopener noreferrer"><Instagram className={styles.icon} /></a>
        <a href="https://youtube.com/@Aadarshguru" target="_blank" rel="noopener noreferrer"><YouTube className={styles.icon} /></a>
      </div>
    </div>
  );
};

export default Footer;
