import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import PlayPauseButton from './PlayPauseButton'
import { Flex, Text, Box } from 'rebass'
import TypingLetter from '../TypingLetter'
import Vibe from '../Vibe'
import Spotify from '../Spotify'
import { isLoggedIn as loggedInStatus } from '../Spotify/Authentication'
const AudioPlayer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(loggedInStatus())
  }, [])

  return (
    <Flex
      flex="0 0 100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"     
    >
      {/* <audio id="audio">
        <source src="" />
        Your browser does not support the <code>audio</code> element.
      </audio> */}
      {isLoggedIn ? (
        <Spotify
          render={({ title, play, setPlay }) => (
            <>
              <Text
                mb={3}
                color="secondary"
                fontSize={[2, 3, 4]}
                textAlign="center"
              >
                TODAY SONG
                <TypingLetter>{title | 'No Title'}</TypingLetter>
              </Text>
              <PlayPauseButton playing={play} setPlaying={setPlay} />
              <Vibe style={{ width: '100%' }} />
            </>
          )}
        />
      ) : (
        <div>not Loggin</div>
      )}
    </Flex>
  )
}

export default AudioPlayer
