import React, { FC } from 'react';
import { IPost } from '../interfaces';

export const Post: FC<{ post: IPost }> = ({ post }) => {
  return (
    <div>
      <h5>{post.title}</h5>
    </div>
  );
};
