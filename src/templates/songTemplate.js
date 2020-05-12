import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Song/Layout'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  return (
    <Layout>
      {data.song.id}
      {/* // <Layout> */}
      {/* <SEO title=""/> */}
      {/* <SongDetail S/> */}
      {/* </Layout> */}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($geniusId: String!) {
    song: songFromGenius(id: { eq: $geniusId }) {
      id
    }
  }
`
