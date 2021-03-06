import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';
import postRed from './post';
import userRed from './user';

export default combineReducers({
  toastr: ToastrReducer,
  auth: authRed,
  post: postRed,
  user: userRed
});
