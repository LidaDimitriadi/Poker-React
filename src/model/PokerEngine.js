import _ from 'lodash';

class Hand {
  constructor(cards) {
    this.cards = _.sortBy(cards, 'weight').reverse();
    this.ranks = _.groupBy(this.cards, 'rank');
    this.suits = _.groupBy(this.cards, 'suit');
    this.rankTimes = _.groupBy(this.ranks, 'length');
    this.suitTimes = _.groupBy(this.suits, 'length');
    this.maxInARow = maxInARow(_.map(this.cards, 'weight'));
  }
  getOfSameRank = (n) => this.rankTimes[n] || [];

  getOfSameSuit = (n) => this.suitTimes[n] || [];

  hasAce = () =>  !!this.ranks['A'];

  hasOfSameRank = (n) => this.getOfSameRank(n).length;

  hasOfSameSuit = (n) => this.getOfSameSuit(n).length;

  hasInARow = (n) => this.maxInARow >= n;

  getWorstSingles = () => _.sortBy(_.flatten(this.getOfSameRank(1)), 'weight');
};

export class PokerHand extends Hand {
  constructor(cards) {
    super(cards);
    const rate = Object.entries(rating).find(([rate, is]) => is(this));
    [this.rate] = rate;
  }
}


export const DeckInitialization = function() {
  const Ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
  const Suits = [ 'hearts', 'clubs', 'diams', 'spades' ];
  let cards = [];
  let key = 0;
  for (const [ weight, rank ] of Ranks.entries()) {
    for (const suit of Suits) {
      cards.push({ suit, rank, weight: weight + 1 , chosen: false, key: key});
      key++;
    }
  }
  return _.shuffle(cards);
}


const maxInARow = (nums) => _.chain(nums)
.sortBy()
.uniq()
.map((num, i) => (num - i))
.groupBy()
.orderBy('length')
.last()
.value()
.length;

const rating = {
  RoyalFlush: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5) && hand.hasAce(),
  StraightFlush: (hand) => hand.hasInARow(5) && hand.hasOfSameSuit(5),
  FourOfAKind: (hand) => hand.hasOfSameRank(4),
  FullHouse: (hand) => hand.hasOfSameRank(3) && hand.hasOfSameRank(2),
  Flush: (hand) => hand.hasOfSameSuit(5),
  Straight: (hand) => hand.hasInARow(5),
  ThreeOfAKind: (hand) => hand.hasOfSameRank(3),
  TwoPair: (hand) => hand.hasOfSameRank(2) === 2,
  OnePair: (hand) => hand.hasOfSameRank(2),
  HighCard: (hand) => hand.hasOfSameRank(1) === 5,
};
