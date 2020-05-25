import {
  LIST_SOCIAL_FEEDS,
  CREATE_POST,
  ADD_POST,
  DELETE_POST,
  LIST_POST_BY_USER,
  LIKE_POST
} from './../types';

const initialState = {
  posts: [],
  post: null,
  likesLength: 0
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
      return {
        ...state,
        posts: [...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        post: null
      };
    case LIST_POST_BY_USER:
      return {
        ...state,
        posts: payload
      };
    case LIKE_POST:
      return {
        ...state,
        likesLength: payload.likes
      };
    default:
      return state;
  }
}
