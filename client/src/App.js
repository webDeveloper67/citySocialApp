import React from 'react';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';

const App = () => {
  return <Provider store={store} />;
};

export default App;
