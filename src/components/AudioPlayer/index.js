import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import PlayPauseButton from './PlayPauseButton'
import { Flex, Text } from 'rebass'
import TypingLetter from '../TypingLetter'

const AudioPlayer = ({
  curTime,
  duration,
  playing,
  setPlaying,
  setClickedTime,
  song,
}) => {
  const [playSong, setPlaySong] = useState(song())

  return (
    <Flex flexDirection="column" alignItems="center">
      <audio id="audio">
        <source src={playSong.song} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Text mb={3} color="secondary" fontSize={[2, 3, 4]} textAlign="center">
        TODAY
        <TypingLetter>
          {playSong.name} By {playSong.by}
        </TypingLetter>
      </Text>
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
      {/* {playing}-{curTime}-{duration} */}
    </Flex>
  )
}

export default AudioPlayer
