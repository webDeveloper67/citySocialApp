import { LIST_SOCIAL_FEEDS, CREATE_POST, ADD_POST } from './../types';

const initialState = {
  posts: [],
  post: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIST_SOCIAL_FEEDS:
      return {
        posts: payload
      };
    case CREATE_POST:
      return {
        ...state,
        post: payload
      };
    case ADD_POST:
      console.log(payload, 'payload for ADD_POST');

      return {
        ...state,
        posts: [...state.posts, payload]
      };
    default:
      return state;
  }
}
