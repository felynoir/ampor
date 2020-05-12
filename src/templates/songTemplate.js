import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Song/Layout'
import TypingLetter from '../components/TypingLetter'

import Spotify from '../components/Spotify'
import { Text } from 'rebass'
import { useAuth } from '../components/Spotify/authContext'

const SongTemplate = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { isAuthenticated } = useAuth()

  console.log(data)
  return (
    <Layout>
      <Text mb={3} color="primary" fontSize={[2, 3, 4]} textAlign="center">
        TODAY SONG
        <TypingLetter>{'No Title'}</TypingLetter>
      </Text>
      {isAuthenticated ? <Spotify /> : <div>login pls</div>}
      {/* <Vibe style={{ width: '100%' }} /> */}
    </Layout>
  )
}

export default SongTemplate

export const pageQuery = graphql`
  query($geniusId: String!) {
    song: songFromGenius(id: { eq: $geniusId }) {
      id
    }
  }
`
