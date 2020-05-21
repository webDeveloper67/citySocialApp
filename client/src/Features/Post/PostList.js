import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map(item => {
          return <PostItem key={item._id} post={item} />;
        })}
    </div>
  );
};

export default PostList;
