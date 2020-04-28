import { REGISTER_SUCCESS } from './../types';

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
      document.cookie = payload.token;
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
