import _ from "lodash";
import {
  SELECT_CARD,
  CHANGE_CARDS,
  IS_WINNER,
  DEAL_CARDS,
  CARD_BACK,
  CAN_CHANGE,
  IS_VISIBLE
} from "./types";
import { CardsCreator, IsWinner } from "../utils/poker";

const Creator = CardsCreator.getInstance();

const createCards = (max, n, remaining = []) => {
  return [...remaining, ...Creator.getCards(max, n)];
};

export const dealCards = () => {
  Creator.clearPassed();

  return {
    type: DEAL_CARDS,
    payload: { dealer: createCards(52, 5), player: createCards(52, 5) }
  };
};

export const changeCards = ({ dealer, player }) => {
  const removedLen = _.filter(player, card => card.selected).length;

  return {
    type: CHANGE_CARDS,
    payload: {
      dealer,
      player: createCards(
        52,
        removedLen,
        _.filter(player, card => !card.selected)
      )
    }
  };
};

export const selectCard = (rank, suit, { dealer, player }) => {
  return {
    type: SELECT_CARD,
    payload: {
      dealer,
      player: _.map(player, card =>
        card.rank === rank && card.suit === suit
          ? { ...card, selected: card["selected"] ? !card.selected : true }
          : card
      )
    }
  };
};

export const isWinner = ({ dealer, player }) => {
  return {
    type: IS_WINNER,
    payload: IsWinner(dealer, player) ? "Player" : "Dealer"
  };
};

export const toggleCards = show => {
  return {
    type: CARD_BACK,
    payload: show
  };
};

export const toggleChange = change => {
  return {
    type: CAN_CHANGE,
    payload: change
  };
};

export const toggleVisibility = visible => {
  return {
    type: IS_VISIBLE,
    payload: visible
  };
};
