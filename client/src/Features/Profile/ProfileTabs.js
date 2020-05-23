import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FollowGrid from './FollowGrid';
import PostList from './../Post/PostList';

const ProfileTabs = ({ user, posts, deletePost }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setTab(0);
  }, []);

  const TabContainer = props => {
    return (
      <Typography component="div" style={{ padding: 8 * 2 }}>
        {props.children}
      </Typography>
    );
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 &&
        <TabContainer>
          <PostList posts={posts} deletePost={deletePost} />
        </TabContainer>}
      {tab === 1 &&
        <TabContainer>
          <FollowGrid people={user.following} />
        </TabContainer>}
      {tab === 2 &&
        <TabContainer>
          <FollowGrid people={user.followers} />
        </TabContainer>}
    </div>
  );
};

export default ProfileTabs;
