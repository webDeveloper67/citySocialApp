import React, { useEffect } from 'react';
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
import IconButton from '@material-ui/core/IconButton';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowUp } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { getAllUsers } from './../../redux/action/user';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}));

const Users = ({ users, getAllUsers }) => {
  const classes = useStyles();

  useEffect(
    () => {
      getAllUsers();
    },
    [getAllUsers]
  );
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users &&
          users.map((item, i) => {
            return (
              <Link to={`/user/${item._id}`} key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <FontAwesomeIcon icon={faUser} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
      </List>
    </Paper>
  );
};

const mapState = state => ({
  users: state.user.users
});

export default connect(mapState, { getAllUsers })(Users);
