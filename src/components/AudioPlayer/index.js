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
    </Flex>
  )
}

export default AudioPlayer
