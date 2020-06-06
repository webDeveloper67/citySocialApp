import axios from 'axios';
import {
  LIST_SOCIAL_FEEDS,
  CREATE_POST,
  ADD_POST,
  DELETE_POST,
  LIST_POST_BY_USER,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  UNCOMMENT_POST,
  ADD_COMMENT
} from './../types';

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

  dispatch({
    type: ADD_POST,
    payload: updatedPosts
  });
};

// Remove a post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (error) {}
};

// list posts by user
export const listPostByUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/posts/by/${userId}`);

    dispatch({
      type: LIST_POST_BY_USER,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Like a post
export const likePost = (params, postId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ userId: params.userId, postId });

  try {
    const res = await axios.put(`/api/v1/posts/like`, body, config);

    dispatch({
      type: LIKE_POST,
      payload: { postId, likes: res.data.likes }
    });
  } catch (error) {
    console.log(error);
  }
};

// Unlike a post
export const unlikePost = (params, postId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ userId: params.userId, postId });
  try {
    const res = await axios.put(`/api/v1/posts/unlike`, body, config);

    dispatch({
      type: UNLIKE_POST,
      payload: { postId, likes: res.data.likes }
    });
  } catch (error) {
    console.log(error);
  }
};

// Comment on a post
export const comment = (userId, postId, comment) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      userId,
      postId,
      comment
    });
    const res = await axios.put('/api/v1/posts/comment', body, config);

    dispatch({
      type: COMMENT_POST,
      payload: {
        userId,
        postId,
        comment: res.data.comments
      }
    });
  } catch (error) {
    console.log(
      error,
      'error when we are trying to create a comment on a post'
    );
  }
};
