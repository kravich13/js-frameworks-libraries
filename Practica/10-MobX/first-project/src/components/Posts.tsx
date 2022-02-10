import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { IPost } from '../interfaces';
import { postsStore } from '../mobX/postsStore';
import { Post } from './Post';

export const Posts: FC = observer(() => {
  return (
    <div>
      <h1>Posts</h1>

      {postsStore.posts.map((post: IPost) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
});
