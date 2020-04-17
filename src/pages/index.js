import React, { useRef } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Flex, Box, Button, Text } from 'rebass'
import PlainGround from '../components/PlainGround'
import styled from 'styled-components'
import AudioPlayer from '../components/AudioPlayer'
import Vibe from '../components/Vibe'

import useAudioPlayer from '../components/AudioPlayer/useAudioPlayer'

const CoverFlex = styled(Flex)`
  padding: 32px;
  background: whitesmoke;
`
const LeftFlex = styled(Flex)`
  background: ${props => props.theme.colors.secondary};
  transform-origin: 0 0;
`
const RightFlex = styled(Flex)`
  position: relative;
  background: ${props => props.theme.colors.primary};
`
const GreetingBox = styled(Flex)`
  text-align: right;
  color: ${props => props.theme.colors.primary};
`
const BOLD = styled.span`
  font-weight: ${props => props.theme.fontWeights.bold};
`

const HomePage = () => {
  const audioPlayerState = useAudioPlayer()

  return (
    <Layout>
      <SEO title="Home" />
      <CoverFlex style={{ height: '100%' }}>
        <LeftFlex
          flex="1 0"
          alignItems="flex-end"
          justifyContent="center"
          flexDirection="column"
        >
          <GreetingBox mr={[2, 3, 5]} flexDirection="column">
            <Text fontSize={[3, 4, 6]}>
              ThIs Is Me._.<BOLD>AMPOR</BOLD>{' '}
            </Text>
            <Text>i'm glad you're here</Text>
          </GreetingBox>
        </LeftFlex>
        <RightFlex
          flex="1 0"
          flexDirection="column"
          justifyContent="space-between"
        >
          <div></div>
          <Box mx="auto">
            <AudioPlayer
              {...audioPlayerState}
              src={
                'https://ia800105.us.archive.org/34/items/Yiruma-MayBe/Yiruma-May%20Be.mp3'
              }
            />
          </Box>
          <Vibe playing={audioPlayerState.playing} />
        </RightFlex>
      </CoverFlex>
    </Layout>
  )
}

export default HomePage
