import { FIND_PEOPLE, GET_ALL_USERS, READ_USER } from './../types';

const initialState = {
  users: [],
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIND_PEOPLE:
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      };
    case READ_USER:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
}
