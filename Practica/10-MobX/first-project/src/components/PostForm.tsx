import React, { FC, useState } from 'react';
import { postsStore } from '../mobX/postsStore';

export const PostForm: FC = () => {
  const [value, setValue] = useState('');

  const onSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      postsStore.createPost(value);
      setValue('');
    }
  };

  return (
    <div>
      <h1>Post Form</h1>

      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} name="newPost" />
      </form>
    </div>
  );
};
