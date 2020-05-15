import axios from 'axios';
import { READ_USER, UPDATE_USER } from './../types';

export const readUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/users/${userId}`);

    dispatch({
      type: READ_USER,
      payload: res.data
    });
  } catch (error) {
    console.log(error, 'error occurred in readUser action 😃');
  }
};

export const updateUser = (userId, userInfo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const body = userInfo;

  try {
    const res = await axios.put(`/api/v1/users/${userId}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
  } catch (error) {
    console.log(error, 'error occurred in updateUser action 😃');
  }
};
