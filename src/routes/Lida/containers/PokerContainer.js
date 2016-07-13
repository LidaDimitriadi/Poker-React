import { connect } from 'react-redux';
import { handleClick } from '../modules/deal';
import _ from 'lodash';

import Poker from 'components/Cards';

//==================
//POKER ENGINE
//==================

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

class PokerHand extends Hand {
  constructor(cards) {
    super(cards);
    const rate = Object.entries(rating).find(([rate, is]) => is(this));
    [this.rate] = rate;
  }
}

function deal() {
  const Ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
  const Suits = [ 'hearts', 'clubs', 'diams', 'spades' ];
  let cardsTemp = [];
  for (const [ weight, rank ] of Ranks.entries()) {
    for (const suit of Suits) {
      cardsTemp.push({ suit, rank, weight: weight + 1 });
    }
  }
  const cards = _.shuffle(cardsTemp);
  return new PokerHand(cards.slice(0, 5));
};

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


//====================
//REDUX STATE HANDLING
//====================

const mapActionCreators = {
  handleClick: () => handleClick()
};

const mapStateToProps = (state) => ({
  deal: state.deal,
  hand: deal()
});


export default connect(mapStateToProps, mapActionCreators)(Poker);
