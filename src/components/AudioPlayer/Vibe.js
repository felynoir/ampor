import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0%,100% {
    height: 40px;
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
  }
`

const Vibe = () => {
  return (
    <Container>
      {Array(20)
        .fill()
        .map((v, i) => (
          <div
            style={{
              '--number-delay': i * Math.random() * 80 + 'ms',
              '--number-count': i,
            }}
          ></div>
        ))}
    </Container>
  )
}

export default Vibe
