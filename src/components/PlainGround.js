import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'

const FlexStyled = styled(Flex)`
  background: white;
`

const PlainGround = ({ children }) => {
  return <FlexStyled>{children}</FlexStyled>
}

export default PlainGround
