import { deal, addCardToChosen, toggleCardState, autoUpdate, evaluate } from 'helpers/ViewEventsHandling';
import { DeckInitialization } from 'model/PokerEngine';

//ACTIONS
export const DEAL = 'DEAL';
export const UPDATE_HAND = 'UPDATE_HAND';
export const CHOSEN_CARD = 'CHOSEN_CARD';
export const GET_WINNER = 'GET_WINNER';


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

export function evaluateHands() {
  return {
    type: GET_WINNER
  }
};

export const actions = {
  handleClick,
  updateHand,
  chosenCard,
  evaluateHands
}

const ACTION_HANDLERS = {
  [DEAL]: (state, action) => {
                      return {
                        ...state,
                        deal: !state.deal,
                        chosenCards: [],
                        playerHand: !state.deal ? deal(5, null, state.deck, state.chosenCards) : { cards: []},
                        computerHand: !state.deal ? deal(5, null, state.deck.slice(5, state.deck.length), state.chosenCards) : { cards: []},
                        deck: state.deal ? state.deck.slice(10, state.deck.length) : DeckInitialization(),
                        getWinner: false
                      };
                    },
  [UPDATE_HAND]: (state, action) => {
                          return {
                            ...state,
                            chosenCards: [],
                            playerHand: deal(state.chosenCards.length, state.playerHand, state.deck, state.chosenCards),
                            computerHand: autoUpdate(state.computerHand),
                            deck: state.deck.slice(state.chosenCards.length, state.deck.length)
                          };
                        },
  [CHOSEN_CARD]: (state, action) => {
                              return {
                                ...state,
                                chosenCards: addCardToChosen(state.chosenCards, state.playerHand, action.payload),
                                playerHand: toggleCardState(state.playerHand, state.chosenCards, action.payload),
                              };
                        },
  [GET_WINNER]: (state, action) => {
                            return {
                              ...state,
                              result: evaluate(state.playerHand, state.computerHand),
                              getWinner: true
                            };
                          }
};


const initialState = {
  deal: false,
  chosenCards: [],
  playerHand: { cards: []},
  computerHand: { cards: []},
  getWinner: false,
  result: '',
  deck: DeckInitialization()
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};
