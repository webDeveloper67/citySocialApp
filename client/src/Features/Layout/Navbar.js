import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { logout } from './../../redux/action/auth';

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: 'none'
  }
}));

const Navbar = ({ history, auth, logout }) => {
  const classes = useStyles();

  const { isAuthenticated, user } = auth;

  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ffcf33' };
    else return { color: '#ffffff' };
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          City Social
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home">
            <FontAwesomeIcon icon={faHome} color="yellow" />
          </IconButton>
        </Link>
        {!isAuthenticated &&
          !user &&
          <span>
            <Link to="/signup" className={classes.styledLink}>
              <Button style={isActive(history, '/signup')}>Sign up</Button>
            </Link>
            <Link to="/signin" className={classes.styledLink}>
              <Button style={isActive(history, '/signin')}>Sign In</Button>
            </Link>
          </span>}

        {isAuthenticated &&
          user &&
          <span>
            <Link to={'/user/' + auth.user._id} className={classes.styledLink}>
              <Button style={isActive(history, '/user/' + auth.user._id)}>
                My Profile
              </Button>
            </Link>
            <Button color="inherit" onClick={() => logout(history)}>
              Sign out
            </Button>
          </span>}
      </Toolbar>
    </AppBar>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default compose(withRouter, connect(mapState, { logout }))(Navbar);
