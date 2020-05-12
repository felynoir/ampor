import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'

import { useEffect } from 'react'

const Container = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`

const Layout = ({ children }) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>{children}</Container>
    </ThemeProvider>
  )
}

export default Layout
