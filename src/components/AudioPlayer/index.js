import React from 'react'
import styled from 'styled-components'
import useAudioPlayer from './useAudioPlayer'

const Player = styled.div``

const AudioPlayer = ({ src }) => {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClcikedTime,
  } = useAudioPlayer()

  return (
    <Player>
      <audio id="audio">
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      {playing}-{curTime}-{duration}
    </Player>
  )
}

export default AudioPlayer
