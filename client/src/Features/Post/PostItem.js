import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Comments from './Comments';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faComment,
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// Redux
import { connect } from 'react-redux';
import {
  deletePost,
  likePost,
  unlikePost,
  updateComment
} from './../../redux/action/post';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing()
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing()
  }
}));

const PostItem = ({
  post,
  auth,
  deletePost,
  likePost,
  unlikePost,
  updateComment,
  comments
}) => {
  const classes = useStyles();

  const { user } = auth;

  const [likeData, setLikeData] = useState({
    like: false
  });

  const { like } = likeData;

  // const [commentData, setCommentData] = useState({
  //   comments: []
  // });

  // const { comments } = commentData;

  useEffect(
    () => {
      const checkLike = likeIndex => {
        let match = likeIndex.indexOf(user._id) !== -1;
        return match;
      };
      if (user && user !== null) {
        setLikeData({ ...likeData, like: checkLike(post.likes) });
      }
    },
    [post.likes, user, user._id]
  );

  // useEffect(
  //   () => {
  //     setCommentData({ ...commentData, comments: post.comments });
  //   },
  //   [post.comments]
  // );

  // useEffect(() => {
  //   if (post && post !== null) {
  //     updateComment(post.comments);
  //   }
  // }, []);

  const likePostFunc = () => {
    let callApi = like ? unlikePost : likePost;
    callApi(
      {
        userId: user._id
      },
      post._id
    );
    setLikeData({ ...likeData, like: !like });
  };

  const removePost = () => {
    deletePost(post._id);
  };

  // const updateComments = comments => {
  //   setCommentData({ ...commentData, comments: comments });
  // };
  return (
    <Card className={classes.card} key={post._id}>
      {post.postedBy &&
        <CardHeader
          avatar={<Avatar src={`/api/v1/users/photo/${post.postedBy._id}`} />}
          action={
            post.postedBy._id === user._id &&
            <IconButton onClick={removePost}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          }
          title={
            <Link to={'/user/' + post.postedBy._id}>
              {post.postedBy.name}
            </Link>
          }
          subheader={new Date(post.created).toDateString()}
          className={classes.cardHeader}
        />}

      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {post.text}
        </Typography>
        {post.photo &&
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={`/api/v1/posts/photo/${post._id}`}
              alt="user profile"
            />
          </div>}
      </CardContent>
      <CardActions>
        {like
          ? <IconButton
              className={classes.button}
              aria-label="Like"
              color="secondary"
              onClick={likePostFunc}
            >
              <FontAwesomeIcon icon={faHeartSolid} />
            </IconButton>
          : <IconButton
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
              onClick={likePostFunc}
            >
              <FontAwesomeIcon icon={faHeartRegular} />
            </IconButton>}
        <span>{post.likes.length}</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <FontAwesomeIcon icon={faComment} />
        </IconButton>{' '}
        <span>{post.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments postId={post._id} />
    </Card>
  );
};

const mapState = state => ({
  auth: state.auth
  // post: state.post.post,
  // comments: state.post.comments
});

export default connect(mapState, {
  deletePost,
  likePost,
  unlikePost,
  updateComment
})(PostItem);
