import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map(item => {
          return <PostItem post={item} key={item._id} />;
        })}
    </div>
  );
};

export default PostList;
