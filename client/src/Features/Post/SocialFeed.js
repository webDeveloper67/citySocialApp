import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Components
import NewPost from './NewPost';
import PostList from './PostList';

// Redux
import { connect } from 'react-redux';
import { listSocialFeed } from './../../redux/action/post';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}));

const SocialFeed = ({ auth, listSocialFeed, posts }) => {
  const classes = useStyles();

  const { user } = auth;

  useEffect(
    () => {
      if (user && user._id) {
        listSocialFeed(user._id);
      }
    },
    [listSocialFeed, user]
  );

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Social Feed
      </Typography>
      <Divider />
      <NewPost />
      <Divider />
      <PostList posts={posts} />
    </Card>
  );
};

const mapState = state => ({
  auth: state.auth,
  posts: state.post.posts
});

export default connect(mapState, { listSocialFeed })(SocialFeed);
