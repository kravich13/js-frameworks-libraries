# Gatsby

- [Gatsby](#gatsby)
  - [Основы](#основы)
    - [Установка и запуск](#установка-и-запуск)
    - [Структура проекта](#структура-проекта)
    - [Роутинг](#роутинг)
    - [Работа с изображениями и видео](#работа-с-изображениями-и-видео)
    - [Статические запросы GraphQL](#статические-запросы-graphql)
    - [Шаблон для создания страниц](#шаблон-для-создания-страниц)

Это аналог NextJS и основан на серверном рендеринге - SSR. Клиентский рендеринг, т.е. CSR - подходят для веб-приложений, небольших сайтов и т.д..

Базовые отличия серверного рендеринга от клиентского:

- на слабых устройствах серверный будет быстрее, т.к. весь рендер не на стороне клиента;
- для очень большого количества страниц серверный рендеринг в приоритете, поскольку это максимально быстрая прогрузка этих самых страниц;
- клиентский рендеринг не может эффективно работать с SEO.

---

## Основы

### Установка и запуск

```bash
npm install -g gatsby-cli # установка глобально

gatsby new # инициализация приложения

gatsby develop # запуск
```

### Структура проекта

Самое интересное - это 4 конфиг файла в корне:

- `gatsby-browser.js` - нужен для доступа к жизненному циклу проекта в браузере, [подробнее](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/)
- `gatsby-config.js` - юзается для метаданных проекта и установки всех плагинов в проект, [подробнее](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/#add-to-gatsby-configjs)
- `gatsby-node.js` - даёт доступ к различным методом на этапе сборка проекта, [подробнее](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)
- `gatsby-ssr.js` - используется для изменения очередности страниц, чтобы к примеру стили загружать раньше, чем другие скрипты, [подробнее](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/)

### Роутинг

В реакте или RN есть специальные навигаторы, в которые помещаются все страницы/экраны и настраиваются отдельно.

В Gatsby по пути `src/pages` лежит `index.js`, который является главным url.

Структура роутинга должна быть такой:

```bash
src
    pages
          404.js    # /404
          index.js  # /
          about.js  # /about
          posts
                    page-1  # /posts/page-1
                    page-2  # /posts/page-2
                    page-3  # /posts/page-3
```

Т.е. есть чёткая иерархия роутов внутри Gatsby и нужно просто ей следовать.

Перемещаться на разные страницы нужно так:

```jsx
import { Link } from 'gatsby';

<Link to="/posts/page-1">Title</Link>;
```

### Работа с изображениями и видео

Для оптимизации изображений или видео нужно сначала импортировать файл как в RN и затем использовать его внутри атрибута `src`:

```jsx
import gatsbyIcon from '../images/gatsby-icon.png';

<img src={gatsbyIcon} alt="gatsbyIcon" />;
```

### Статические запросы GraphQL

Статические запросы через GraphQL используются для SEO.

Объект метаданных находится в `gatsby-config.js` в поле `siteMetadata`.

Переходим на `http://localhost:8000/\_\_\_graphql` и получаем данные:

![](images/2022-10-19%2014.06.39.jpg)

И как реализован стандартный компонент Seo:

```jsx
import { useStaticQuery, graphql } from 'gatsby';

function Seo({ description, title, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
}
```

### Шаблон для создания страниц

Чтобы не писать руками каждую страницу, , можно использовать шаблон внутри `gatsby-node`:

```js
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions; // достаём мето для создания страниц

  const { data } = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            category
            url
          }
        }
      }
    }
  `);

  // allMarkdownRemark - отдельный модуль, который позволяет работать с MD файлом (где каждый MD может быть 1 страницей)

  // здесь читаем каждый MD-шник, достаём из него данные о файле и создаём на основе этого страницу

  data.allMarkdownRemark.nodes.forEach(({ frontmatter: { url, category } }) => {
    createPage({
      path: `/${category}/${url}`,
      component: path.resolve('./src/templates/single-post.js'),
      context: { url },
    });
  });
};
```

Затем в файле `single-post.js` получаем все данные и отрисовываем содержимое каждого MD файла:

```jsx
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

const SinglePost = ({ data: { markdownRemark } }) => {
  const { html } = markdownRemark;
  const { title, url, category, image } = markdownRemark.frontmatter;

  return (
    <Layout>
      <Seo title={title} />

      <div>
        <h1>{title}</h1>

        <div>
          <GatsbyImage image={getImage(image)} alt={title} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </Layout>
  );
};

export default SinglePost;

export const query = graphql`
  query MyQuery($url: String) {
    markdownRemark(frontmatter: { url: { eq: $url } }) {
      html
      frontmatter {
        url
        title
        category
        image {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
    }
  }
`;
```
