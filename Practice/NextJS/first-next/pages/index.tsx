import Head from 'next/head';
import Link from 'next/link';

export default function Index() {
  return (
    <>
      <Head>
        <title>Main</title>
        <meta name="keywords" content="next, js, crypto" />
        <meta name="description" content="I am kravich, bugaga" />
      </Head>

      <h1>Kravich gang</h1>

      <p>
        <Link href="/posts">Posts</Link>
      </p>
    </>
  );
}
