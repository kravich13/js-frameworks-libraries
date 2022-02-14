import React, { FC } from 'react';

export const Comment: FC<{ comment: any }> = ({ comment }) => {
  return <div>{comment.name}</div>;
};
