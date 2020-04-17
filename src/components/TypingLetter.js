import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Text } from 'rebass'
const typing = keyframes`
  from { width: 0 }
  80% { width: 100% }
  to { width: 100%}
`
const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: orange; }
`

const Letter = styled(Text)`
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  animation: ${typing} 9s steps(50, end) infinite,
    ${blinkCaret} 0.75s step-end infinite;
`

const TypingLetter = ({ children }) => {
  return <Letter>{children}</Letter>
}

export default React.memo(TypingLetter)
