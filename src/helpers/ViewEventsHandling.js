import _ from 'lodash';
import { PokerHand, getCompareStr } from 'model/PokerEngine';


export const playersInitialization = function(players, formValues) {
  players.push({name: formValues.Name, cards: []});
  for(let i = 1; i <= formValues.NumberOfOpponents; i++) {
    players.push({name: `ComputerPlayer${i}`, cards: []});
  }
  return players;
}

export const dealToAllPlayers = function(players, deck) {
  for(var i=0; i<players.length; i++) {
    players[i] = deal(5, null, deck, [], players[i].name);
    deck = deck.slice(5, deck.length);
  }
  return players;
}

export const deal = function(num, hand, deck, chosenCards, name) {
  //an moirazetai gia prwth fora to hand
  if(!hand) {
    return new PokerHand(deck.slice(0, num), name);
  }
  //an exw hand kai 8elw na alla3w xartia
  else {
    const cardsToAdd = deck.slice(0, num);
    let handToReturn = _.pullAll(hand.cards, chosenCards);
    return new PokerHand(_.concat(handToReturn, cardsToAdd), name);
  }
}

export const addCardToChosen = function(chosenCards, hand, id) {
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

export const toggleCardState = function(players, chosenCards, id) {
  const index = _.findIndex(players[0].cards, (x) => (x.key == id));
  let newHand = players[0];
  if(chosenCards.length >= 3) {
    if(players[0].cards[index].chosen == false) {
      return players;
    }
    else {
      newHand.cards[index].chosen = !newHand.cards[index].chosen;
      players[0] = newHand;
      return players;
    }
  }
  else {
    newHand.cards[index].chosen = !newHand.cards[index].chosen;
    players[0] = newHand;
    return players;
  }
}

export const updateAllPlayers = function(players, deck, chosenCards) {
  players[0] = deal(chosenCards.length, players[0], deck, chosenCards, players[0].name);
  deck = deck.slice(chosenCards.length, deck.length);
  for(var i=1; i<players.length; i++) {
    var cardsToSlice = autoCardsToUpdate(players[i]);
    players[i] = autoUpdate(players[i], deck);
    deck = deck.slice(cardsToSlice, deck.length);
  }
  return players;
}

export const updateDeck = function(players, deck, chosenCards) {
  deck = deck.slice(chosenCards.length, deck.length);
  for(var i=1; i<players.length; i++) {
    var cardsToSlice = autoCardsToUpdate(players[i]);
    deck = deck.slice(cardsToSlice, deck.length);
  }
  return deck;
}

export const autoUpdate = function(hand, deck) {
  let cardsToDiscard = [];
  let pairRank = [];
  switch (hand.rate) {
    case 'RoyalFlush' || 'StraightFlush' || 'FourOfAKind' || 'FullHouse' || 'Flush' || 'Straight':
      return hand;
      break;
    case 'ThreeOfAKind':
      pairRank.push(hand.rankTimes[3][0][0].rank);
      cardsToDiscard =  _.filter(hand.cards, x => (x.rank != pairRank));
      return deal(cardsToDiscard.length, hand, deck, cardsToDiscard, hand.name);;
      break;
    case 'TwoPair':
      pairRank.push(hand.rankTimes[2][0][0].rank);
      pairRank.push(hand.rankTimes[2][1][0].rank);
      cardsToDiscard =  _.filter(hand.cards, x => (x.rank != pairRank[0]
                                                    && x.rank != pairRank[1]));
      return deal(cardsToDiscard.length, hand, deck, cardsToDiscard, hand.name);
      break;
    case 'OnePair':
        pairRank.push(hand.rankTimes[2][0][0].rank);
        cardsToDiscard =  _.filter(hand.cards, x => (x.rank != pairRank));
        return deal(cardsToDiscard.length, hand, deck, cardsToDiscard, hand.name);
        break;
    case 'HighCard':
      cardsToDiscard = [hand.cards[2], hand.cards[3], hand.cards[4]];
      return deal(3, hand, deck, cardsToDiscard, hand.name);
      break;
    default:
      return hand;
  }
  return hand;
}

export const autoCardsToUpdate = function(hand) {
  if(hand.rate == 'HighCard' || hand.rate == 'OnePair') {
    return 3;
  }
  else if(hand.rate == 'ThreeOfAKind') {
    return 2;
  }
  else if(hand.rate == 'TwoPair') {
    return 1;
  }
  return 0;
}

export const evaluate = function(players) {
  let results = _.map(players, (player) => {
    let result = getCompareStr(player);
    return { name: player.name, result: result };
  });
  let resultsSorted = _.chain(results)
                       .sortBy('result')
                       .reverse()
                       .value();
  return `Player ${resultsSorted[0].name} won!!`;
}
