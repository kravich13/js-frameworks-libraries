import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SinglePost = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, image },
    },
  },
}) => {
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
  )
}

export default SinglePost

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
`
