const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
  `)

  data.allMarkdownRemark.nodes.forEach(({ frontmatter: { url, category } }) => {
    createPage({
      path: `/${category}/${url}`,
      component: path.resolve("./src/templates/single-post.js"),
      context: { url },
    })
  })

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
