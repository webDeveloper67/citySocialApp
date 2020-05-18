import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOAD_USER,
  LOGOUT,
  UPDATE_USER,
  DELETE_USER
} from './../types';

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
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case LOGOUT:
    case DELETE_USER:
      document.cookie =
        'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=127.0.0.1';
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
