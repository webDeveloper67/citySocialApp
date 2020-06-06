import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// REDUX
import { connect } from 'react-redux';
import { findPeople, readUser } from './../../redux/action/user';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: 0
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  follow: {
    right: theme.spacing(2)
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  }
}));

const FindPeople = ({ findPeople, auth, readUser, users }) => {
  const classes = useStyles();

  const { user } = auth;

  const [open, setOpen] = useState(false);

  const handleRequestClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(
    () => {
      if (user && user !== null) {
        findPeople(user._id);
      }
    },
    [findPeople, user]
  );

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {users &&
            users.map((item, i) => {
              return (
                <span key={i}>
                  <ListItem>
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar src={`/api/v1/users/photo/${item._id}`} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction className={classes.follow}>
                      <Link to={'/user/' + item._id}>
                        <IconButton
                          variant="contained"
                          color="secondary"
                          className={classes.viewButton}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </IconButton>
                      </Link>
                      <Button
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                        // onClick={this.clickFollow.bind(this, item, i)}
                      >
                        Follow
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              );
            })}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        // message={
        //   <span className={classes.snack}>
        //     {this.state.followMessage}
        //   </span>
        // }
      />
    </div>
  );
};

const mapState = state => ({
  auth: state.auth,
  users: state.user.users
});

export default connect(mapState, { findPeople, readUser })(FindPeople);
