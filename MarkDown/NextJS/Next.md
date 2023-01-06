# Next

- [Next](#next)
  - [Основы](#основы)
    - [Установка и запуск](#установка-и-запуск)
    - [Роутинг](#роутинг)
    - [Динамические URL](#динамические-url)
    - [SEO \& Meta](#seo--meta)
    - [Тег style](#тег-style)
    - [Работа с загрузкой данных](#работа-с-загрузкой-данных)

NextJS основан на серверном рендеринге - SSR. Клиентский рендеринг, т.е. CSR - подходят для веб-приложений, небольших сайтов и т.д..

## Основы

### Установка и запуск

```bash
# create project
npx create-next-app@latest --typescript

# add into project
npm install next react react-dom

npm run dev
```

### Роутинг

В Next по пути `pages` лежит `index.js`, который является главным url.

Структура роутинга должна быть такой:

```bash
pages
      404.js    # /404 - есть по дефолту
      index.js  # /
      about.js  # /about
      posts
                index.js # /posts
                page-1   # /posts/page-1
                page-2   # /posts/page-2
                page-3   # /posts/page-3
```

---

### Динамические URL

Для создания динамических URL по типу:

```bash
/posts/11
/posts/1123123
```

нужно создавать файлы как:

```bash
pages
      posts
                index.js # /posts
                [id].js  # /posts/dynamic_url
```

и затем получить текущий айдишник внутри компонента можно с помощью:

```tsx
// [id.tsx]

import { useRouter } from 'next/router';

type RouterQueryType = 'id'; // as filename

export default function Post() {
  const router = useRouter();
  const routerId = router.query.id as RouterQueryType;

  return (
    <>
      <h1>Post {routerId}</h1>
    </>
  );
}
```

Навигация между страницами:

```tsx
import Link from 'next/link';

<Link href="/posts">Posts</Link>;

// или

import Router from 'next/router';

<button onClick={() => Router.push('/')}>Go back home</button>;
```

Также навигация на динамический URL:

```tsx
<Link href={`post/${id}`}>Post {id}</Link>
```

---

### SEO & Meta

Для SEO и Meta существует специальный компонент `Head`:

```tsx
import Head from 'next/head';

<Head>
  <title>Main</title>
  <meta name="keywords" content="next, js, crypto" />
  <meta name="description" content="I am kravich, bugaga" />
</Head>;
```

### Тег style

Для создания стилей можно юзать `style` внутри компонента:

```tsx
<style jsx>{`
  h1 {
    color: red;
  }
  span {
    color: red;
  }
`}</style>
```

Эти стили применятся только внутри самого компонента. Если же нужно сделать стили глобальными - добавляем атрибут `global`.

---

### Работа с загрузкой данных

В обычном реакте нужно юзать `useMemo` и/или `useEffect` или `useState` для загрузки данных с сервера. Тоже самое можно делать и в NextJS, только в случае с SSR это будет бесполезное занятие по причине того, что роботы увидят данные **до** загрузки с сервера, а не **после**.

Для исправления этой ситуации существует что-то вроде компонента высшего порядка `getInitialProps`, который позволяет как в Redux обернуть компонент и передать ему нужные данные при первом рендере:

```tsx
import { NextPage } from 'next';

interface IResponseData {
  id: number;
  userName: string;
}

interface IPostsProps {
  usersData: IResponseData[];
}

const Posts: NextPage<IPostsProps> = ({ usersData }) => {

Posts.getInitialProps = async ({}) => {
  const data: IResponseData[] = [];

  await new Promise((resolve) => {
    setTimeout(() => {
      data.push(...[
        { id: 1, userName: 'Vlad' },
        { id: 2, userName: 'Max' },
        { id: 3, userName: 'Kate' },
        ]
      )

      resolve(1);
    }, 4000);
  });

  return { usersData: data };
};

export default Posts;
```
