import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useCallback } from "react"

import * as styles from "../components/index.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark

  const post = useCallback(
    ({ frontmatter: { category, title, url, image }, id }) => (
      <div key={id} className={styles.post}>
        <GatsbyImage image={getImage(image)} alt={title} />

        <Link to={`/${category}/${url}`}>{title}</Link>
      </div>
    ),
    []
  )

  return (
    <Layout>
      <Seo title="Home" />

      <div className={styles.textCenter}>{nodes.map(post)}</div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      nodes {
        html
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                formats: [AUTO, AVIF]
                placeholder: BLURRED
              )
            }
          }
        }
        id
      }
    }
  }
`
