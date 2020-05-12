import axios from 'axios';
import { LIST_SOCIAL_FEEDS } from './../types';

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
