import _ from 'lodash';
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
cards = _.shuffle(cards);

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

const deal = function(num, hand, deck, chosenCards) {
  //an moirazetai gia prwth fora to hand
  if(!hand) {
    return new PokerHand(deck.slice(0, num));
  }
  //an exw hand kai 8elw na alla3w xartia
  else {
    const cardsToAdd = deck.slice(0, num);
    let handToReturn = _.pullAll(hand.cards, chosenCards);
    return new PokerHand(_.concat(handToReturn, cardsToAdd));
  }
}

const addCardToChosen = function(chosenCards, hand, id) {
  //an to brei to diagrafei
  const index = _.findIndex(chosenCards, (x) => (x.key == id));
  if(index > -1) {
    return  _.concat(chosenCards.slice(0, index), chosenCards.slice(index+1, chosenCards.length));
  }
  else {
    if(chosenCards.length == 3) {
      return chosenCards;
    }
    return  _.concat(chosenCards, [_.find(hand.cards, (x) => (x.key == id))]);
  }
}

const toggleCardState = function(hand, chosenCards, id) {
  const index = _.findIndex(hand.cards, (x) => (x.key == id));
  let newHand = hand;
  if(chosenCards.length >= 3) {
    if(hand.cards[index].chosen == false) {
      return hand;
    }
    else {
      newHand.cards[index].chosen = !newHand.cards[index].chosen;
      return newHand;
    }
  }
  else {
    newHand.cards[index].chosen = !newHand.cards[index].chosen;
    return newHand;
  }
}


//===========
//REDUX STATE
//===========


//ACTIONS
export const DEAL = 'DEAL';
export const UPDATE_HAND = 'UPDATE_HAND';
export const CHOSEN_CARD = 'CHOSEN_CARD';


//ACTION CREATORS
export function handleClick(){
  return {
    type: DEAL
  }
};

export function updateHand() {
  return {
    type: UPDATE_HAND
  }
};

export function chosenCard(id) {
  return {
    type: CHOSEN_CARD,
    payload: id
  }
};

export const actions = {
  handleClick,
  updateHand,
  chosenCard
}

const ACTION_HANDLERS = {
  [DEAL]: (state, action) => {
                      return {
                        deal: !state.deal,
                        chosenCards: [],
                        hand: !state.deal ? deal(5, null, state.deck, state.chosenCards) : { cards: []},
                        deck: state.deck.slice(5, cards.length)
                      };
                    },
  [UPDATE_HAND]: (state, action) => {
                          return {
                            deal: state.deal,
                            chosenCards: [],
                            hand: deal(state.chosenCards.length, state.hand, state.deck, state.chosenCards),
                            deck: state.deck.slice(state.chosenCards.length, cards.length)
                          };
                        },
  [CHOSEN_CARD]: (state, action) => {
                              return {
                                deal: state.deal,
                                chosenCards: addCardToChosen(state.chosenCards, state.hand, action.payload),
                                hand: toggleCardState(state.hand, state.chosenCards, action.payload),
                                deck: state.deck
                              };
                        }
};


const initialState = {
  deal: false,
  chosenCards: [],
  hand: { cards: []},
  deck: cards
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};
