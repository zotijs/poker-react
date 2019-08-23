import React from "react";
import styles from "./styles.module.css";
import Logo from "./Logo";
import Hand from "./Hand";

const Deck = ({ cards, cardBack, onSelectCard }) => {
  return (
    <div className={styles.deckContainer}>
      <Logo />
      <Hand cardBack={cardBack} hand={cards.dealer} />
      <div className={styles.separator} />
      <Hand selectable hand={cards.player} onSelectCard={onSelectCard} />
    </div>
  );
};

export default Deck;
