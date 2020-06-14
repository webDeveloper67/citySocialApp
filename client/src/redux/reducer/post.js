import {
  LIST_SOCIAL_FEEDS,
  CREATE_POST,
  ADD_POST,
  DELETE_POST,
  LIST_POST_BY_USER,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  UPDATE_COMMENT
} from './../types';

const initialState = {
  posts: [],
  post: null,
  comments: []
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
        posts: Object.values(
          state.posts.reduce((r, o) => {
            r[o._id] = o;
            return r;
          }, {})
        )
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
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post._id === payload.postId
              ? { ...post, likes: payload.likes }
              : post
        )
      };
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload._id),
        post: payload
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: payload
      };
    default:
      return state;
  }
}
// { ...state.post, comments: payload.comments }
