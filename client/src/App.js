import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import genAuthToken from './utils/genAuthToken';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { indigo, amber } from '@material-ui/core/colors';

// Layout
import Navbar from './Features/Layout/Navbar';

// Auth
import Signup from './Features/Auth/Signup';
import Signin from './Features/Auth/Signin';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';
import { loadUser } from './redux/action/auth';

// Color Palette
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6573c3',
      main: '#3f51b5',
      dark: '#2c387e',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#000'
    },
    openTitle: indigo['400'],
    protectedTitle: amber['400'],
    type: 'light'
  }
});

// set default Header
let cookieValue = document.cookie.replace(
  /(?:(?:^|.*;\s*)jwt=\s*\s*([^;]*).*$)|^.*$/,
  '$1'
);
_.startsWith('jwt=', cookieValue);
_.split(cookieValue, '; ', 2);
if (cookieValue) {
  genAuthToken(cookieValue);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <ReduxToastr
            timeOut={4000}
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
