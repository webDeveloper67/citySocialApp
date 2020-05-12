import React from 'react';
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
import { faTrash, faLink, faComment } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';

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

const PostItem = ({ post, auth }) => {
  const classes = useStyles();

  const { user } = auth;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={`/api/v1/users/photo/${post.postedBy._id}`} />}
        action={
          post.postedBy._id === user._id &&
          <IconButton>
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
      />
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
      {/* <CardActions>
				{ this.state.like
					? <IconButton className={classes.button} aria-label="Like" color="secondary">
							<FontAwesomeIcon icon={faLink} />
						</IconButton>
					: <IconButton className={classes.button} aria-label="Unlike" color="secondary">
							<h6>icon</h6>
						</IconButton> } <span>{this.state.likes}</span>
						<IconButton className={classes.button} aria-label="Comment" color="secondary">
							<FontAwesomeIcon icon={faComment} />
						</IconButton> <span>{this.state.comments.length}</span>
			</CardActions> */}
      <Divider />
      {/* <Comments postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/> */}
    </Card>
  );
};

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState)(PostItem);
