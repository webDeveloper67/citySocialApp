import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { indigo, amber } from '@material-ui/core/colors';

// Layout
import Navbar from './Features/Layout/Navbar';

// Auth
import Signup from './Features/Auth/Signup';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';

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

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
