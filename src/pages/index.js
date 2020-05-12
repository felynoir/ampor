import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Flex, Box, Button, Text } from 'rebass'
import styled from 'styled-components'
import AudioPlayer from '../components/AudioPlayer'

import useAudioPlayer from '../components/AudioPlayer/useAudioPlayer'
import { todayAudio } from '../components/AudioPlayer/audio-lists'
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
              <BOLD>`AMPOR`</BOLD>{' '}
            </Text>
            <Text>im glad youre here</Text>
          </GreetingBox>
        </LeftFlex>
        <RightFlex>
          <AudioPlayer />
        </RightFlex>
      </CoverFlex>
    </Layout>
  )
}

export default HomePage
