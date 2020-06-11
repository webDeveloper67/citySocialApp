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
      return {
        ...state,
        // posts: state.posts.filter(post => post._id !== payload._id)
        posts: [...state.posts]
        // posts: state.posts.filter(
        //   post => (post._id !== payload._id ? state.post : [...state.post])
        // )
        // posts: state.posts.map(post => (post ? post : state.post))
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
      console.log(payload._id, 'comment post 🧩');
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload._id),
        post: payload
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        post: payload.comments
      };
    default:
      return state;
  }
}
// { ...state.post, comments: payload.comments }
