import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { IPost } from '../interfaces';
import { postsStore } from '../mobX/postsStore';
import { Post } from './Post';

export const AsyncPosts: FC = observer(() => {
  const onClick = () => {
    postsStore.downloadPosts();
  };

  return (
    <div>
      <h1>Async posts</h1>

      {!postsStore.asyncPosts.length && (
        <button disabled={postsStore.loading} onClick={onClick}>
          {postsStore.loading ? 'Загрузка...' : 'Загрузить'}
        </button>
      )}

      {postsStore.asyncPosts.map((post: IPost) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
});
