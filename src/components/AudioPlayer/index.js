import React, { useState } from 'react'
import styled from 'styled-components'

import PlayPauseButton from './PlayPauseButton'
import { Flex, Text } from 'rebass'
import TypingLetter from '../TypingLetter'

const AudioPlayer = ({
  src,
  curTime,
  duration,
  playing,
  setPlaying,
  setClickedTime,
}) => {
  const [face, setFace] = useState('front')
  return (
    <Flex flexDirection="column" alignItems="center">
      <audio id="audio">
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Text mb={3} color="secondary" fontSize={[2, 3, 4]} textAlign="center">
        TODAY
        <TypingLetter>MAYBE FROM Yimura</TypingLetter>
      </Text>
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
      {/* {playing}-{curTime}-{duration} */}
    </Flex>
  )
}

export default AudioPlayer
