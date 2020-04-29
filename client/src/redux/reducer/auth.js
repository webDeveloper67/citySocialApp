import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOAD_USER } from './../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt=\s*\s*([^;]*).*$)|^.*$/,
    '$1'
  )
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      document.cookie = payload.token;
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    default:
      return state;
  }
}
