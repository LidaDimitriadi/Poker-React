import _ from 'lodash';
import { PokerHand, getCompareStr } from 'model/PokerEngine';


export const deal = function(num, hand, deck, chosenCards) {
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

export const toggleCardState = function(hand, chosenCards, id) {
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


//TODO AI update
export const autoUpdate = function(hand) {
  return hand;
}

export const evaluate = function(playerHand, computerHand) {
  let playerResult = getCompareStr(playerHand);
  let computerResult = getCompareStr(computerHand);
  console.log(playerResult);
  console.log(computerResult);
  return playerResult > computerResult ? "YOU WIN!!" : "YOU LOSE!!";
}
