import axios from 'axios';
import {
  READ_USER,
  UPDATE_USER,
  DELETE_USER,
  FIND_PEOPLE,
  GET_ALL_USERS
} from './../types';

// Load auth user
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

// Update user Profile
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

// Remove User
export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/v1/users/${userId}`);

    dispatch({
      type: DELETE_USER
    });
  } catch (error) {
    console.log(error, 'error if it can not delete user');
  }
};

// Find People
export const findPeople = userId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.get(`/api/v1/users/findpeople/${userId}`, config);

    dispatch({
      type: FIND_PEOPLE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all users
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/users`);

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
