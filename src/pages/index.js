import React, { useRef, useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Flex, Box, Button, Text } from 'rebass'
import PlainGround from '../components/PlainGround'
import styled from 'styled-components'
import AudioPlayer from '../components/AudioPlayer'
import Vibe from '../components/Vibe'

import useAudioPlayer from '../components/AudioPlayer/useAudioPlayer'
import { todayAudio } from '../components/AudioPlayer/audio-lists'
import Helmet from 'react-helmet'
import SpotifyPlayback from '../components/Spotify'

const CoverFlex = styled(Flex)`
  padding: 32px;
  background: ${props => props.theme.colors.secondary};
`
const LeftFlex = styled(Flex)`
  flex: 1 0 50%;
  background: ${props => props.theme.colors.secondary};
  transform-origin: 0 0;
  align-items: flex-end;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-basis: 100%;
    align-items: center;
  }
`
const RightFlex = styled(Flex)`
  flex: 1 0 50%;
  position: relative;
  background: ${props => props.theme.colors.primary};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-basis: 100%;
  }
`
const GreetingBox = styled(Flex)`
  text-align: right;
  color: ${props => props.theme.colors.primary};
`
const BOLD = styled.div`
  font-weight: ${props => props.theme.fontWeights.bold};
`

const HomePage = ({ params, ...props }) => {
  const audioPlayerState = useAudioPlayer()

  return (
    <Layout>
      <SEO title="It's me" />
      <CoverFlex style={{ height: '100%' }} flexWrap="wrap">
        <LeftFlex justifyContent="center" flexDirection="column">
          <GreetingBox mr={[2, 3, 5]} flexDirection="column">
            <Text fontSize={[3, 4, 6]}>
              ThIs Is Me._.
              <BOLD>`AMPOR`</BOLD>{' '}
            </Text>
            <Text>im glad youre here</Text>
          </GreetingBox>
        </LeftFlex>
        <RightFlex flexDirection="column" justifyContent="space-between">
          <SpotifyPlayback />
          <Box mx="auto">
            <AudioPlayer {...audioPlayerState} song={todayAudio} />
          </Box>
          <Vibe playing={audioPlayerState.playing} />
        </RightFlex>
      </CoverFlex>
    </Layout>
  )
}

export default HomePage
