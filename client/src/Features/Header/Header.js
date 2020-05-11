import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
    minHeight: '10rem',
    paddingBottom: 0
  },
  hero: {
    backgroundImage: 'url(/img/hero.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.hero} />
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              City Social
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              <FontAwesomeIcon icon={faQuoteLeft} size="xs" />
              You don’t need a corporation or a marketing company to brand you
              now: you can do it yourself. You can establish who you are with a
              social media following.<FontAwesomeIcon
                icon={faQuoteRight}
                size="xs"
              />
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary">
              ~ Ray Allen, former American professional basketball players
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
