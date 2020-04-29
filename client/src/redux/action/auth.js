import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './../types';
import { toastr } from 'react-redux-toastr';

// Signup a user
export const register = (
  { name, email, password },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/users/signup', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // payload is token
    });
    toastr.success('Success', 'successfully signed up.');
    history.push('/');
    // dispatch(loadUser());
  } catch (error) {
    let registerErr = error.response.data;

    if (registerErr.error.name === 'ValidationError') {
      const errMsg = Object.values(registerErr.error.errors).map(
        el => el.message
      );

      const message = `Invalid input data. ${errMsg.join('. ')}`;

      dispatch({
        type: REGISTER_FAIL
      });
      toastr.error(message);
    }
  }
};

// Signin a user to our app
export const login = ({ email, password }, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    toastr.success('Success', 'successfully signed in.');
    history.push('/');
    // dispatch(loadUser());
  } catch (error) {
    let loginErr = error.response.data.message;

    dispatch({
      type: LOGIN_FAIL
    });
    toastr.error(loginErr);
  }
};
