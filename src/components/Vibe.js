import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%,100% {
    height: 30px;
  }
  50% {
    height: 100px;
  }
`

const Container = styled.div`
  position: relative;

  & > div {
    position: absolute;
    bottom: 0;
    left: calc(100% / 20 * var(--number-count));
    width: calc(100% / 20);
    opacity: 0.4;
    background-color: white;
    animation: ${pulse} 1s var(--number-delay) ease-in infinite;
    animation-play-state: ${props => (props.playing ? 'running' : 'paused')};
  }
`

const Vibe = ({ playing }) => {
  return (
    <Container playing={playing}>
      {Array(20)
        .fill()
        .map((v, i) => (
          <div
            key={i}
            style={{
              height: ((i + 1) * Math.random() * 60) % 60,
              '--number-delay': (i + 1) * Math.random() * 60 + 'ms',
              '--number-count': i,
            }}
          ></div>
        ))}
    </Container>
  )
}

export default React.memo(Vibe)
