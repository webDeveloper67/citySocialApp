import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import FollowGrid from './FollowGrid';
import PostList from './../Post/PostList';

const ProfileTabs = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab({ tab: value });
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          fullwidth
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 &&
        <TabPanel>
          <PostList />
        </TabPanel>}
      {tab === 1 &&
        <TabPanel>
          <FollowGrid />
        </TabPanel>}
      {tab === 2 &&
        <TabPanel>
          <FollowGrid />
        </TabPanel>}
    </div>
  );
};

export default ProfileTabs;
