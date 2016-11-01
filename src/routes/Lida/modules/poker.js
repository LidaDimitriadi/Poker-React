import { dealToAllPlayers, addCardToChosen, toggleCardState, playersInitialization, updateAllPlayers, evaluate, updateDeck } from 'helpers/ViewEventsHandling';
import { DeckInitialization } from 'model/PokerEngine';

//ACTIONS
export const DEAL = 'DEAL';
export const START_GAME = 'START_GAME';
export const INVALID_FORM = 'INVALID_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const UPDATE_HAND = 'UPDATE_HAND';
export const CHOSEN_CARD = 'CHOSEN_CARD';
export const GET_WINNER = 'GET_WINNER';


//ACTION CREATORS
export function handleClick() {
  return {
    type: DEAL
  }
};

export function invalidForm() {
  return {
    type: INVALID_FORM
  }
}

export function submit(values) {
  return {
    type: SUBMIT_FORM,
    payload: values
  }
};

export function startGame() {
  return {
    type: START_GAME
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
  startGame,
  submit,
  invalidForm,
  handleClick,
  updateHand,
  chosenCard,
  evaluateHands
}

export const deckSlice = function(deck, number) {
  var cardsToSlice = 5*number;
  return deck.slice(cardsToSlice, deck.length);
}

const ACTION_HANDLERS = {
  [START_GAME]: (state, action) => {
                        return {
                          ...state,
                          started: !state.started
                        };
                      },
  [INVALID_FORM]: (state, action) => {
                        return {
                          ...state,
                          validForm: !state.validForm
                        };
                      },
  [SUBMIT_FORM]: (state, action) => {
                        return {
                          ...state,
                          players: playersInitialization(state.players, action.payload)
                        };
                      },
  [DEAL]: (state, action) => {
                      return {
                        ...state,
                        deal: !state.deal,
                        chosenCards: [],
                        players: !state.deal ? dealToAllPlayers(state.players, state.deck) : state.players,
                        deck: !state.deal ? deckSlice(state.deck, state.players.length) : DeckInitialization(),
                        getWinner: false
                      };
                    },
  [UPDATE_HAND]: (state, action) => {
                        return {
                          ...state,
                          chosenCards: [],
                          players: updateAllPlayers(state.players, state.deck, state.chosenCards),
                          deck: updateDeck(state.players, state.deck, state.chosenCards)
                        };
                      },
  [CHOSEN_CARD]: (state, action) => {
                              return {
                                ...state,
                                chosenCards: !state.getWinner ? addCardToChosen(state.chosenCards, state.players[0], action.payload) : chosenCards,
                                players: !state.getWinner ? toggleCardState(state.players, state.chosenCards, action.payload) : players,
                              };
                        },
  [GET_WINNER]: (state, action) => {
                            return {
                              ...state,
                              result: evaluate(state.players),
                              getWinner: true
                            };
                          }
};


const initialState = {
  started: false,
  deal: false,
  validForm: true,
  chosenCards: [],
  players: [],
  getWinner: false,
  result: '',
  deck: DeckInitialization()
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};
