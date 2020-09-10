import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Flex, Box, Button, Text } from 'rebass'
import styled from 'styled-components'
import AudioPlayer from '../components/AudioPlayer'

import useAudioPlayer from '../components/AudioPlayer/useAudioPlayer'
import { todayAudio } from '../components/AudioPlayer/audio-lists'
import { AmpStoryProvider } from '../components/Amp/storyContext'
import Axios from 'axios'

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

  useEffect(() => {
    const callApi = async () => {
      const res = await Axios.get(
        `https://api.genius.com/songs/4906198?access_token=iFYbsUEjcX6Y6jzgjjmuqkNoRASAYFW53yJXWdywBE84NOQILwaOCJD4vWOyCFfm`
      )
      console.log(res.data)
    }
    callApi()
  }, [])

  return (
    <Layout>
      <SEO title="It's me" />
      <CoverFlex style={{ height: '100%' }} flexWrap="wrap">
        <LeftFlex justifyContent="center" flexDirection="column">
          <GreetingBox mr={[2, 3, 5]} flexDirection="column">
            <Text fontSize={[3, 4, 6]}>
              ThIs Is Me._.
              <BOLD>`17012`</BOLD>{' '}
            </Text>
            <Text>im glad youre here</Text>
          </GreetingBox>
        </LeftFlex>
        <RightFlex flexDirection="column">
          <AmpStoryProvider>
            <Flex alignItems="center">
              <amp-story-player style={{ width: '360px' }}>
                <a href="https://amp-playground.vercel.app/17012.html">
                  My Project
                </a>
              </amp-story-player>
              <Flex
                flexDirection="column"
                alignItems="center"
                flex="1 auto"
                p={2}
              >
                <h2>List Song</h2>
                <a href="/nive/tired">Tired</a>
                <a href="/gracie-abrams/I-miss-you-Im-sorry">
                  I miss you Im Sorry
                </a>
              </Flex>
            </Flex>
          </AmpStoryProvider>
        </RightFlex>
      </CoverFlex>
    </Layout>
  )
}

export default HomePage
