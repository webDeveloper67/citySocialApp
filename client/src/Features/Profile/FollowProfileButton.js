import React from 'react';
import Button from '@material-ui/core/Button';

const FollowProfileButton = () => {
  return (
    <div>
      <Button variant="contained" color="secondary">
        Unfollow
      </Button>
      <Button variant="contained" color="primary">
        Follow
      </Button>
    </div>
  );
};

export default FollowProfileButton;
