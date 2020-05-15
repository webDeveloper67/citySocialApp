import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { updateUser } from './../../redux/action/user';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename: {
    marginLeft: '10px'
  }
}));

const EditUserProfile = ({ match, auth, updateUser }) => {
  const classes = useStyles();

  const { user } = auth;

  const [editUserProfile, setEditUserProfile] = useState({
    name: '',
    about: '',
    photo: '',
    email: '',
    password: ''
  });

  const [redirect, setRedirect] = useState(false);

  const { name, about, photo, email, password } = editUserProfile;

  let userInfo = useRef(new FormData());

  useEffect(() => {
    setEditUserProfile({
      ...editUserProfile,
      id: user._id,
      name: user.name,
      email: user.email,
      about: user.about
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userPhoto = user._id
    ? `/api/v1/users/photo/${user._id}?${new Date().getTime()}`
    : `/api/v1/users/defaultphoto`;

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    userInfo.current.set(name, value);
    setEditUserProfile({ ...editUserProfile, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(match.params.userId, userInfo.current);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={`/user/${user._id}`} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar src={userPhoto} className={classes.bigAvatar} />
        <br />
        <input
          accept="image/*"
          onChange={handleChange('photo')}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload
            <FontAwesomeIcon icon={faUpload} />
          </Button>
        </label>{' '}
        <span className={classes.filename}>{photo ? photo.name : ''}</span>
        <br />
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="About"
          multiline
          rows="2"
          value={about}
          onChange={handleChange('about')}
          className={classes.textField}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />{' '}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState, { updateUser })(EditUserProfile);
