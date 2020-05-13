const axios = require('axios')
const crypto = require('crypto')

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    if (node.frontmatter.geniusId === null) return
    try {
      const geniusId = node.frontmatter.geniusId
      const res = await axios.get(
        `https://api.genius.com/songs/${geniusId}?access_token=iFYbsUEjcX6Y6jzgjjmuqkNoRASAYFW53yJXWdywBE84NOQILwaOCJD4vWOyCFfm`
      )
      console.log('found', node)
      if (res.status !== 200) return
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
    } catch (e) {
      console.log(e)
    }
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createNode } = actions

  const songTemplate = require.resolve(`./src/templates/songTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { geniusId: { ne: null } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              slug
              geniusId
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
        geniusId: node.frontmatter.geniusId ? node.frontmatter.geniusId : 'ff',
      },
    })
  })
}
