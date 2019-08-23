import { combineReducers } from "redux";
import {
  SELECT_CARD,
  CHANGE_CARDS,
  IS_WINNER,
  DEAL_CARDS,
  CARD_BACK,
  CAN_CHANGE,
  IS_VISIBLE
} from "../actions/types";

const cardsReducer = (state = {}, action) => {
  if (action.type === DEAL_CARDS) return action.payload;
  if (action.type === CHANGE_CARDS) return action.payload;
  if (action.type === SELECT_CARD) return action.payload;

  return state;
};

const winnerReducer = (state = {}, action) => {
  if (action.type === IS_WINNER) return action.payload;

  return state;
};

const cardBackReducer = (state = true, action) => {
  if (action.type === CARD_BACK) return action.payload;

  return state;
};

const canChangeReducer = (state = true, action) => {
  if (action.type === CAN_CHANGE) return action.payload;

  return state;
};

const isVisibleReducer = (state = false, action) => {
  if (action.type === IS_VISIBLE) return action.payload;

  return state;
};

export default combineReducers({
  cards: cardsReducer,
  winner: winnerReducer,
  cardBack: cardBackReducer,
  canChange: canChangeReducer,
  isVisible: isVisibleReducer
});
