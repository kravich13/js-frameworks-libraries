import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Comment } from './Comment';

const fetchComments = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=20');
  return res.json();
};

export const Comments: FC = () => {
  const { data, status } = useQuery('Comments', fetchComments);

  return (
    <div>
      <h2>Comments</h2>

      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.map((comment: any) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
};
