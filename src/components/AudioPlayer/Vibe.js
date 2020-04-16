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
  & > div {
    display: inline-block;
    width: calc(100% / 20);
    height: 40px;
    opacity: 0.4;
    background-color: white;
    animation: ${pulse} 2s var(--number-count)
      cubic-bezier(0.28, 1.69, 0.82, -0.61) infinite;
  }
`

const Vibe = () => {
  return (
    <Container>
      {Array(20)
        .fill()
        .map((v, i) => (
          <div
            style={{ '--number-count': i * Math.random() * 100 + 'ms' }}
          ></div>
        ))}
    </Container>
  )
}

export default Vibe
