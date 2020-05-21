import React from 'react';
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
import Divider from '@material-ui/core/Divider';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing()}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
}));

const UserProfile = ({ auth, match }) => {
  const classes = useStyles();

  const { user } = auth;

  const photoUrl =
    user && user._id
      ? `/api/v1/users/photo/${user._id}?${new Date().getTime()}`
      : '/api/v1/users/defaultphoto';
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar} />
          </ListItemAvatar>
          {user &&
            user._id &&
            <ListItemText primary={user.name} secondary={user.email} />}
          {user && user._id && user.following
            ? <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            : <FollowProfileButton />}
        </ListItem>
        <Divider />
        {user &&
          user._id &&
          <ListItem>
            <ListItemText
              primary={user.about}
              secondary={'Joined: ' + new Date(user.created).toDateString()}
            />
          </ListItem>}
      </List>
      <ProfileTabs />
    </Paper>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState)(UserProfile);
