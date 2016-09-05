import { deal, addCardToChosen, toggleCardState } from 'helpers/ViewEventsHandling';
import { DeckInitialization } from 'model/PokerEngine';

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
                        deck: state.deck.slice(5, state.deck.length)
                      };
                    },
  [UPDATE_HAND]: (state, action) => {
                          return {
                            deal: state.deal,
                            chosenCards: [],
                            hand: deal(state.chosenCards.length, state.hand, state.deck, state.chosenCards),
                            deck: state.deck.slice(state.chosenCards.length, state.deck.length)
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
  deck: DeckInitialization()
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};
