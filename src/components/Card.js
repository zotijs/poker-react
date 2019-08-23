import React from "react";
import styles from "./styles.module.css";
import "../resources/cards/cards.css";

class Card extends React.Component {
  getUnicodeSuit = suit => {
    switch (suit) {
      case "spades":
        return "\u2660";
      case "hearts":
        return "\u2665";
      case "diams":
        return "\u2666";
      case "clubs":
        return "\u2663";
      default:
        return null;
    }
  };

  handleCardSelect = () => {
    if (!this.props.onSelectCard) return;

    this.props.onSelectCard(this.props.rank, this.props.suit);
  };

  render() {
    return (
      <div className={styles.cardContainer} onClick={this.handleCardSelect}>
        <div className={`card rank-${this.props.rank} ${this.props.suit}`}>
          <span className="rank">{this.props.rank}</span>
          <span className="suit">{this.getUnicodeSuit(this.props.suit)}</span>
        </div>
        {this.props.selectable && this.props.selected && (
          <div className={styles.checkedMask}>&#10003;</div>
        )}
        {this.props.cardBack && (
          <div className={styles.backMask}>
            <div className="card back" />
          </div>
        )}
      </div>
    );
  }
}

export default Card;
