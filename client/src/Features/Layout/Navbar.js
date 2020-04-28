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

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: 'none'
  }
}));

const Navbar = ({ history }) => {
  const classes = useStyles();

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

        <span>
          <Link to="/signup" className={classes.styledLink}>
            <Button style={isActive(history, '/signup')}>Sign up</Button>
          </Link>
          <Link to="/signin" className={classes.styledLink}>
            <Button style={isActive(history, '/signin')}>Sign In</Button>
          </Link>
        </span>

        {/* {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      } */}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
