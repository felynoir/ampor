module.exports = {
  siteMetadata: {
    title: `Ampor`,
    description: `Me as a little developer in a big world. Nattapat Sriwichailumpun's or Por's personal site. `,
    author: `@ampor`,
    url: `https://ampor.xyz`,
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sounds`,
        path: `${__dirname}/src/assets/sounds`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: 'whitesmoke',
        theme_color: 'whitesmoke',
        display: `minimal-ui`,
        // icon: `src /images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
