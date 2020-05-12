import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Song/Layout'
import AudioPlayer from '../components/AudioPlayer'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  return (
    <Layout>
      <AudioPlayer />
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
