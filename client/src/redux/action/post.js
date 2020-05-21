import axios from 'axios';
import { LIST_SOCIAL_FEEDS, CREATE_POST, ADD_POST } from './../types';

// Read posts for a user
export const listSocialFeed = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/posts/feed/${userId}`);

    dispatch({
      type: LIST_SOCIAL_FEEDS,
      payload: res.data
    });
  } catch (error) {
    console.log(error, '🤣');
  }
};

// Create Post
export const createPost = (userId, postData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const body = postData;

  try {
    const res = await axios.post(`/api/v1/posts/new/${userId}`, body, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Post
export const addPost = post => (dispatch, state) => {
  let updatedPosts = state().post.posts;

  updatedPosts.unshift(post);

  console.log(post, 'post aas arg in addPost action 😒');
  dispatch({
    type: ADD_POST,
    payload: updatedPosts
  });
};
