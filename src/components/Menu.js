import React from "react";
import styles from "./styles.module.css";

const Menu = ({
  onDealCards,
  onChangeCards,
  onGetWinner,
  canChange,
  winner,
  visible
}) => {
  return (
    <div className={styles.menuContainer}>
      <span>
        <button onClick={onDealCards}>Deal</button>
        <button disabled={!canChange} onClick={onChangeCards}>
          Change
        </button>
        <button onClick={onGetWinner}>Who Wins?</button>
      </span>
      {visible && <div className={styles.winner}>{`${winner} Wins!`}</div>}
    </div>
  );
};

export default Menu;
