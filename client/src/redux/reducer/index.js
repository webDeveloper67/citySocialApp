import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';

export default combineReducers({
  toastr: ToastrReducer,
  auth: authRed
});
