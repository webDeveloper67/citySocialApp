import { LIST_SOCIAL_FEEDS } from './../types';

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_SOCIAL_FEEDS:
      return {
        posts: payload
      };
    default:
      return state;
  }
}
