import React from "react";
import styles from "./styles.module.css";

const Logo = () => {
  return (
    <div className={styles.pokerTitle}>
      <div className={styles.poker}>POKER</div>
      <div className={styles.in}>&spades; &hearts; IN &diams; &clubs;</div>
      <div className={styles.react}>REACT</div>
    </div>
  );
};

export default Logo;
