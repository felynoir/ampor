import React from 'react'
import { graphql } from 'gatsby'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  return (
    <div>
      {data.song.id}
      {/* // <Layout> */}
      {/* <SEO title=""/> */}
      {/* <SongDetail S/> */}
      {/* </Layout> */}
    </div>
  )
}

export const pageQuery = graphql`
  query($geniusId: String!) {
    song: songFromGenius(id: { eq: $geniusId }) {
      id
    }
  }
`
