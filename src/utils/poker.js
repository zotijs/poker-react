import _ from "lodash";

/*
Example implementation used in the Think Functional course
taken from: https://codepen.io/dlivas/pen/mqJwmX
*/

//
//  Util Functions
//
function deepFreeze(object) {
  if (typeof object !== "object") {
    return object;
  }
  Object.freeze(object);

  Object.values(object).forEach(value => deepFreeze(value));

  return object;
}

const maxInARow = weights =>
  _.chain(weights)
    .sortBy()
    .uniq()
    .map((num, i) => num - i)
    .groupBy()
    .orderBy("length")
    .last()
    .value().length;

//
// Playing Cards class definition and implementation
// in a functional fashion
//
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
const Suits = Object.freeze(["hearts", "clubs", "diams", "spades"]);

const Cards = deepFreeze(
  Object.entries(Ranks).reduce(
    (cards, [weight, rank]) => [
      ...cards,
      ...Suits.map(suit => ({ rank, suit, weight }))
    ],
    []
  )
);

const CardsAndDeck = (currentDeck, n = 0) => {
  const deck =
    currentDeck !== Cards
      ? currentDeck.slice(n, currentDeck.length)
      : currentDeck
          .slice(n, currentDeck.length)
          .sort(() => Math.random() - 0.5);

  Object.freeze(deck);
  const cards = Object.freeze(deck.slice(n));

  return {
    cards,
    deck
  };
};

export class RateableCards {
  constructor(cards) {
    this.ranks = _.groupBy(cards, "rank");
    this.suits = _.groupBy(cards, "suit");
    this.rankTimes = _.groupBy(this.ranks, "length");
    this.suitTimes = _.groupBy(this.suits, "length");
    this.maxInARow = maxInARow(cards.map(({ weight }) => weight));
  }

  getOfSameRank(n) {
    return this.rankTimes[n] || [];
  }

  getOfSameSuit(n) {
    return this.suitTimes[n] || [];
  }

  hasAce() {
    return !!this.ranks["A"];
  }

  hasOfSameRank(n) {
    return this.getOfSameRank(n).length;
  }

  hasOfSameSuit(n) {
    return this.getOfSameSuit(n).length;
  }

  hasInARow(n) {
    return this.maxInARow >= n;
  }

  getWorstSingles() {
    return _.chain(this.getOfSameRank(1))
      .flatten()
      .sortBy("weight")
      .value();
  }
}

//
// Poker Ratings
//
const PokerRating = {
  RoyalFlush: hand =>
    hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: hand => hand.hasInARow(5) && hand.hasOfSameSuit(5),
  FourOfAKind: hand => hand.hasOfSameRank(4),
  FullHouse: hand => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: hand => hand.hasOfSameSuit(5),
  Straight: hand => hand.hasInARow(5),
  ThreeOfAKind: hand => hand.hasOfSameRank(3),
  TwoPair: hand => hand.hasOfSameRank(2) >= 2,
  OnePair: hand => hand.hasOfSameRank(2),
  HighCard: hand => hand.hasOfSameRank(1) >= 5
};

export const PokerHandRate = cards =>
  Object.entries(PokerRating).find(([, is]) => is(cards))[0];

export const CardsCreator = (() => {
  let instance;

  const init = () => {
    let passed = [];

    const getUniqueRandomInt = max => {
      const num = Math.floor(Math.random() * Math.floor(max));

      if (_.includes(passed, num)) {
        return getUniqueRandomInt(max);
      }

      passed.push(num);

      return num;
    };

    const clearPassed = () => {
      passed = [];
    };

    const getCards = (max = 52, n = 5) => {
      return _.times(n, () => Cards[getUniqueRandomInt(max)]);
    };

    return {
      getCards,
      clearPassed
    };
  };

  return {
    getInstance: () => {
      if (!instance) instance = init();

      return instance;
    }
  };
})();

export const IsWinner = (dealerHand, playerHand) => {
  const ranks = Object.keys(PokerRating);

  return (
    ranks.indexOf(String(PokerHandRate(new RateableCards(dealerHand)))) >
    ranks.indexOf(String(PokerHandRate(new RateableCards(playerHand))))
  );
};
