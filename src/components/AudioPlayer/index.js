import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import PlayPauseButton from './PlayPauseButton'
import { Flex, Text, Box } from 'rebass'
import TypingLetter from '../TypingLetter'
import Vibe from '../Vibe'
import Spotify from '../Spotify'
const AudioPlayer = () => {
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
      )
    </Flex>
  )
}

export default AudioPlayer
