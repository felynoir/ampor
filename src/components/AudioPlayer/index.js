import React from 'react'
import styled from 'styled-components'

import PlayPauseButton from './PlayPauseButton'

const Scene = styled.div`
  width: 200px;
  height: 200px;

  --cube-size: 200px;
  perspective: 600px;
`

const CubeFace = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  opacity: 0.5;
`

const Front = styled(CubeFace)`
  background: blue;
  transform: translate3d(0, 0, calc(var(--cube-size) / 2));
`
const Left = styled(CubeFace)`
  background: yellow;
  transform: rotateY(-90deg) translate3d(0, 0, calc(var(--cube-size) / 2));
`
const Right = styled(CubeFace)`
  background: green;
  transform: rotateY(90deg) translate3d(0, 0, calc(var(--cube-size) / 2));
`

const Cube = styled.div`
  width: inherit;
  height: inherit;
  position: relative;

  transform-style: preserve-3d;
`

const AudioPlayer = ({
  src,
  curTime,
  duration,
  playing,
  setPlaying,
  setClickedTime,
}) => {
  return (
    <div>
      <audio id="audio">
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Scene>
        <Cube>
          <Front />
          <Left />
          <Right />
        </Cube>
      </Scene>
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
      {playing}-{curTime}-{duration}
    </div>
  )
}

export default AudioPlayer
