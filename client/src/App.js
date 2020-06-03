import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import genAuthToken from './utils/genAuthToken';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { indigo, amber } from '@material-ui/core/colors';

// Custom CSS
import './App.css';

// Layout
import Navbar from './Features/Layout/Navbar';

// Header
import Header from './Features/Header/Header';

// Auth
import Signup from './Features/Auth/Signup';
import Signin from './Features/Auth/Signin';
import Users from './Features/Profile/Users';

// Profile
import UserProfile from './Features/Profile/UserProfile';
import EditUserProfile from './Features/Profile/EditUserProfile';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';
import { loadUser } from './redux/action/auth';

// Utils
import PrivateRoute from './utils/PrivateRoute';

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
  }, []);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Header} />
          <ReduxToastr
            timeOut={4000}
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/users" component={Users} />
            <PrivateRoute
              path="/user/edit/:userId"
              component={EditUserProfile}
            />
            <Route path="/user/:userId" component={UserProfile} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
