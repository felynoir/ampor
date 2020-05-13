import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Song/Layout'
import TypingLetter from '../components/TypingLetter'

import Spotify from '../components/Spotify'
import { useAuth } from '../components/Spotify/authContext'

import styled from 'styled-components'
import { Text, Flex, Box } from 'rebass'
import Axios from 'axios'

const Container = styled(Flex)`
  flex-direction: column;
  padding: 0 40px;
`

const MediaContainer = styled(Flex)`
  height: 100vh;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const SongCover = styled.img`
  width: 100%;
`

const SpotifyLogin = styled.button`
  background: #1db954;
  color: white;
  border-radius: 500px;
  padding: 11px 32px 9px;
  padding-top: 11px;
  padding-right: 32px;
  padding-bottom: 9px;
  padding-left: 32px;
  display: inline-block;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SongTemplate = ({ data: { song } }) => {
  const { isAuthenticated, getToken } = useAuth()
  const { full_title, song_art_image_url } = song
  const handleLoggin = async () => {
    if (typeof window === undefined) return
    const res = await Axios.get('http://localhost:8888/login', {
      withCredentials: true,
    })
    console.log(document.cookie)
    if (res.status === 200 && !!res.data.location)
      window.location.href = res.data.location
  }

  return (
    <Container>
      <MediaContainer>
        <Box>
          <Text mb={3} color="primary" fontSize={[2, 3, 4]} textAlign="center">
            {full_title}
          </Text>
          {isAuthenticated ? (
            <Spotify getToken={getToken} />
          ) : (
            <SpotifyLogin onClick={() => handleLoggin()}>
              Spotify Login
            </SpotifyLogin>
          )}
        </Box>
        <Box>
          <SongCover src={song_art_image_url} alt="song cover" />
        </Box>
      </MediaContainer>
      <div>Lyrics is here</div>
    </Container>
  )
}

const WrapLayoutToTemplate = props => {
  return (
    <Layout>
      <SongTemplate {...props} />
    </Layout>
  )
}

export default WrapLayoutToTemplate

export const pageQuery = graphql`
  query($geniusId: String!) {
    song: songFromGenius(id: { eq: $geniusId }) {
      id
      full_title
      song_art_image_url
    }
  }
`
