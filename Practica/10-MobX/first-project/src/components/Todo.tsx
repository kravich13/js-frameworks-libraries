import React, { FC } from 'react';

export const Todo: FC<{ todo: any }> = ({ todo }) => {
  return <div>{todo.title}</div>;
};
