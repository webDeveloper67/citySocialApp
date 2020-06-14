import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { comment, updateComment } from './../../redux/action/post';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing(),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
}));

const Comments = ({ comment, postId, auth, updateComment, post }) => {
  const classes = useStyles();

  const [commentText, setCommentText] = useState({
    text: ''
  });

  const { text } = commentText;

  const { user } = auth;

  const handleChange = name => event => {
    setCommentText({ ...commentText, [name]: event.target.value });
  };

  const addComment = event => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();

      comment(user._id, postId, { text });
      setCommentText({ ...commentText, text: '' });
    }
  };

  useEffect(() => {
    if (post && post._id === postId) {
      updateComment(post.comments);
    }
  }, []);

  const deleteComment = () => {
    console.log('delete comment func');
  };

  const commentBody = item => {
    return (
      <p className={classes.commentText}>
        <Link to={'/user/' + item.postedBy._id}>
          {item.postedBy.name}
        </Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {user._id === item.postedBy._id &&
            <FontAwesomeIcon
              icon={faTrash}
              onClick={deleteComment(item)}
              className={classes.commentDelete}
            />}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={`/api/v1/users/photo/${user._id}`}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange('text')}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {post &&
        post.comments.map(item => {
          if (post && post._id === postId) {
            return (
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.smallAvatar}
                    src={`/api/v1/users/photo/${item.postedBy._id}`}
                  />
                }
                title={commentBody(item)}
                className={classes.cardHeader}
                key={item._id}
              />
            );
          }
        })}
    </div>
  );
};

const mapState = state => ({
  auth: state.auth,
  post: state.post.post
});

export default connect(mapState, { comment, updateComment })(Comments);
