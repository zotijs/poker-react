const { RateableCards, PokerHandRate } = require("../utils/poker");

const Ranks = Object.freeze([
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
]);
//const weights = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const Suits = Object.freeze(["hearts", "clubs", "diams", "spades"]);

const [H, C, D, S] = Suits;
const c = (weight, suit) => ({ rank: Ranks[weight], suit, weight });

const hands = [
  [c(12, H), c(8, H), c(12, C), c(8, C), c(7, S), c(12, D)],
  [c(12, H), c(12, D), c(12, C), c(8, C), c(12, S), c(6, D)],
  [c(12, H), c(8, H), c(11, H), c(10, H), c(9, H), c(9, C)],
  [c(12, H), c(8, H), c(12, C), c(6, C), c(7, S), c(7, D)],
  [c(12, H), c(8, H), c(7, C), c(3, C), c(5, S), c(4, D)]
];

test("PokerHandRate function exists", () => {
  expect(typeof PokerHandRate).toEqual("function");
});

test("RateableCards function exists", () => {
  expect(typeof RateableCards).toEqual("function");
});

test("check the first hand for Full House", () => {
  expect(PokerHandRate(new RateableCards(hands[0]))).toEqual("FullHouse");
});

test("check the second hand for Four of a Kind", () => {
  expect(PokerHandRate(new RateableCards(hands[1]))).toEqual("FourOfAKind");
});

//etc....
