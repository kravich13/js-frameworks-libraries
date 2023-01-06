import { useRouter } from 'next/router';

type RouterQueryType = 'id';

export default function Post() {
  const router = useRouter();
  const routerId = router.query.id as RouterQueryType;

  return (
    <>
      <h1>Post {routerId}</h1>

      <p>
        I am a <span>crypto</span> investor
      </p>

      <style jsx>{`
        h1 {
          color: red;
        }

        span {
          color: red;
        }
      `}</style>
    </>
  );
}
