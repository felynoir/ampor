import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import { AuthProvider } from '../Spotify/authContext'
import withLocation from '../../utils/withLocation'
import { useEffect } from 'react'

const Container = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`

const Layout = ({ children, location }) => {
  useEffect(() => {
    console.log(location)
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <AuthProvider location={location}>
      {/* <ThemeProvider theme={theme}> */}
      <Container>{children}</Container>
      {/* </ThemeProvider> */}
    </AuthProvider>
  )
}

export default withLocation(Layout)
