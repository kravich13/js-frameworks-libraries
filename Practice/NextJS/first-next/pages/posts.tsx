import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useCallback } from 'react';

interface IResponseData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getData() {
  const data: any[] = [];

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const resData = await res.json();

    data.push(...resData);
  } catch (err) {
    console.log(err);
  }

  return data;
}

export default async function Posts() {
  // const data = await getData();
  // const goBack = useCallback(() => {
  //   Router.push('/');
  // }, []);

  return (
    <>
      <h1>Posts</h1>
      {/* <button onClick={goBack}>Go back home</button> */}

      {/* {usersData.map(({ id, userName }) => (
        <p key={`${id}-${userName}`}>
          <Link href={`post/${id}`}>Post {id}</Link>
        </p>
      ))} */}
    </>
  );
}

// Posts.getInitialProps = async ({ req }) => {
//   if (!req) {
//     return { usersData: [] };
//   }

//   const data: IResponseData[] = [];

//   await new Promise((resolve) => {
//     setTimeout(() => {
//       data.push({ id: 1, userName: 'Vlad' }, { id: 2, userName: 'Max' }, { id: 3, userName: 'Kate' });

//       resolve(1);
//     }, 2000);
//   });

//   return { usersData: data };
// };
