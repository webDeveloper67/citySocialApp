import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { createPost, addPost } from '../../redux/action/post';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename: {
    verticalAlign: 'super'
  }
}));

const NewPost = ({ auth, createPost, post, addPost }) => {
  const classes = useStyles();

  const { user } = auth;

  const [postInfo, setPostInfo] = useState({
    text: '',
    photo: ''
  });

  const { text, photo } = postInfo;

  let postData = useRef(new FormData());

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    postData.current.set(name, value);
    setPostInfo({ ...postInfo, [name]: value });
  };

  const submitPost = () => {
    createPost(user._id, postData.current);
    setPostInfo({ ...postInfo, text: '', photo: '' });
  };

  useEffect(
    () => {
      if (post && post !== null) {
        addPost(post);
      }
    },
    [addPost, post]
  );

  return (
    <div className={classes.root}>
      {user &&
        user._id &&
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar src={`/api/v1/users/photo/${user._id}`} />}
            title={user.name}
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
            <TextField
              placeholder="Share your ideas ..."
              multiline
              rows="3"
              value={text}
              onChange={handleChange('text')}
              className={classes.textField}
              margin="normal"
            />
            <input
              accept="image/*"
              onChange={handleChange('photo')}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                className={classes.photoButton}
                component="span"
              >
                <FontAwesomeIcon icon={faCamera} />
              </IconButton>
            </label>{' '}
            <span className={classes.filename}>{photo ? photo.name : ''}</span>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disabled={text === ''}
              className={classes.submit}
              onClick={submitPost}
            >
              POST
            </Button>
          </CardActions>
        </Card>}
    </div>
  );
};

const mapState = state => ({
  auth: state.auth,
  post: state.post.post
});

export default connect(mapState, { createPost, addPost })(NewPost);
