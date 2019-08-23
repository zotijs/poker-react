import React from "react";
import styles from "./styles.module.css";
import "../resources/cards/cards.css";
import Card from "./Card";

const Hand = ({ selectable, cardBack, hand, onSelectCard }) => {
  const createHand = () => {
    if (!hand) return;

    return hand.map(({ rank, suit, selected }) => {
      return (
        <div className={styles.handItem} key={`${rank}${suit}`}>
          <Card
            selectable={selectable}
            cardBack={cardBack}
            rank={rank}
            suit={suit}
            selected={selected}
            onSelectCard={onSelectCard}
          />
        </div>
      );
    });
  };

  return (
    <div className="playingCards simpleCards">
      <div className={styles.handContainer}>{createHand()}</div>
    </div>
  );
};

export default Hand;
