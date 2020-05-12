const axios = require('axios')
const crypto = require('crypto')

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const geniusId = node.frontmatter.geniusId
    const res = await axios.get(
      `https://api.genius.com/songs/${geniusId}?access_token=iFYbsUEjcX6Y6jzgjjmuqkNoRASAYFW53yJXWdywBE84NOQILwaOCJD4vWOyCFfm`
    )

    createNode({
      ...res.data.response.song,
      id: geniusId,
      // parent: `the-id-of-the-parent-node`, // or null if it's a source node without a parent
      children: [],
      internal: {
        type: `SongFromGenius`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(res.data.response.song))
          .digest(`hex`),
      },
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createNode } = actions

  const songTemplate = require.resolve(`./src/templates/songTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: songTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}
