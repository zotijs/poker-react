const _ = require("lodash");
const { CardsCreator } = require("../utils/poker");
const Creator = CardsCreator.getInstance();

test("getInstance object exists", () => {
  expect(typeof Creator).toEqual("object");
});

const cards = Creator.getCards(52, 52);

test("check generated cards length, to be equal to 52", () => {
  expect(cards.length).toEqual(52);
});

test("check that generated cards are unique", () => {
  expect(_.uniq(cards).length).toEqual(cards.length);
});
