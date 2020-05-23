import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { deleteUser } from './../../redux/action/user';
import { logout } from './../../redux/action/auth';

const DeleteUser = ({ userId, deleteUser, logout, history }) => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [redirect, setRedirect] = useState(false);

  const openDeleteDialog = () => {
    setOpen(true);
  };

  const closeDeleteDialog = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    deleteUser(userId);
    setRedirect(true);
    logout(history);
  };

  // if (redirect) {
  //   return <Redirect to="/" />;
  // }
  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={openDeleteDialog}
        color="secondary"
      >
        <FontAwesomeIcon icon={faTrash} />
      </IconButton>

      <Dialog open={open} onClose={closeDeleteDialog}>
        <DialogTitle>
          {'Delete Account'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default compose(withRouter, connect(null, { deleteUser, logout }))(
  DeleteUser
);
