import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useCallback } from 'react';

interface IResponseData {
  id: number;
  userName: string;
}

interface IPostsProps {
  usersData: IResponseData[];
}

const Posts: NextPage<IPostsProps> = ({ usersData }) => {
  const goBack = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <button onClick={goBack}>Go back home</button>

      {usersData.map(({ id, userName }) => (
        <p key={`${id}-${userName}`}>
          <Link href={`post/${id}`}>Post {id}</Link>
        </p>
      ))}
    </>
  );
};

Posts.getInitialProps = async ({ req }) => {
  if (!req) {
    return { usersData: [] };
  }

  const data: IResponseData[] = [];

  await new Promise((resolve) => {
    setTimeout(() => {
      data.push({ id: 1, userName: 'Vlad' }, { id: 2, userName: 'Max' }, { id: 3, userName: 'Kate' });

      resolve(1);
    }, 4000);
  });

  return { usersData: data };
};

export default Posts;
