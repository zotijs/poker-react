import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  dealCards,
  changeCards,
  selectCard,
  isWinner,
  toggleCards,
  toggleChange,
  toggleVisibility
} from "../actions";
import styles from "./styles.module.css";
import Deck from "./Deck";
import Menu from "./Menu";

class App extends React.Component {
  onDealCards = () => {
    this.props.dealCards();
    this.props.toggleChange(true);
    this.props.toggleCards(true);
    this.props.toggleVisibility(false);
  };

  onSelectCard = (rank, suit) => {
    if (!this.props.canChange) {
      return;
    }

    const len =
      _.filter(this.props.cards.player, { selected: true }).length === 3;
    const isSelected =
      _.filter(this.props.cards.player, {
        rank: rank,
        suit: suit,
        selected: true
      }).length > 0;

    if (len && !isSelected) {
      return;
    }

    this.props.selectCard(rank, suit, this.props.cards);
  };

  onChangeCards = () => {
    this.props.changeCards(this.props.cards);
    this.props.toggleChange(false);
  };

  onGetWinner = () => {
    this.props.toggleCards(false);
    this.props.toggleVisibility(true);
    this.props.toggleChange(false);
    this.props.isWinner(this.props.cards);
  };

  render() {
    return (
      <div className={styles.appContainer}>
        <Deck
          cards={this.props.cards}
          cardBack={this.props.cardBack}
          onSelectCard={this.onSelectCard}
        />
        <Menu
          onDealCards={this.onDealCards}
          onChangeCards={this.onChangeCards}
          onGetWinner={this.onGetWinner}
          canChange={this.props.canChange}
          winner={this.props.winner}
          visible={this.props.isVisible}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    winner: state.winner,
    cardBack: state.cardBack,
    canChange: state.canChange,
    isVisible: state.isVisible
  };
};

export default connect(
  mapStateToProps,
  {
    dealCards,
    selectCard,
    changeCards,
    isWinner,
    toggleCards,
    toggleChange,
    toggleVisibility
  }
)(App);
