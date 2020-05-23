import { FIND_PEOPLE } from './../types';

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIND_PEOPLE:
      return {
        ...state,
        users: payload
      };
    default:
      return state;
  }
}
