import React, { useState } from 'react';
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

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faHeart,
  faComment,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from './../../redux/action/post';

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
  likesLength
}) => {
  const classes = useStyles();

  const { user } = auth;

  const { postedBy } = post;

  const [likeDialog, setLikeDialog] = useState(false);

  const like = () => {
    let callApi = likeDialog ? unlikePost : likePost;
    callApi(
      {
        userId: user._id
      },
      post._id
    );
    setLikeDialog(!likeDialog);
  };

  const removePost = () => {
    deletePost(post._id);
  };

  return (
    <Card className={classes.card} key={post._id}>
      {postedBy &&
        <CardHeader
          avatar={<Avatar src={`/api/v1/users/photo/${postedBy._id}`} />}
          action={
            postedBy._id === user._id &&
            <IconButton onClick={removePost}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          }
          title={
            <Link to={'/user/' + postedBy._id}>
              {postedBy.name}
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
        {likeDialog
          ? <IconButton
              className={classes.button}
              aria-label="Like"
              color="secondary"
              onClick={like}
            >
              <FontAwesomeIcon icon={faHeart} />
            </IconButton>
          : <IconButton
              className={classes.button}
              aria-label="Unlike"
              color="secondary"
              onClick={like}
            >
              <FontAwesomeIcon icon={faHeartbeat} />
            </IconButton>}
        <span>{likesLength && likesLength.length}</span>
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
      {/* <Comments postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/> */}
    </Card>
  );
};

const mapState = state => ({
  auth: state.auth,
  likesLength: state.post.likesLength
});

export default connect(mapState, { deletePost, likePost, unlikePost })(
  PostItem
);
