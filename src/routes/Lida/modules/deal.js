export const DEAL = 'DEAL';


//ACTION
export function handleClick(){
  return {
    type: DEAL
  }
};


export const actions = {
  handleClick
}

const ACTION_HANDLERS = {
  [DEAL]: (state, action) => !state
};

const initialState = false;

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};
