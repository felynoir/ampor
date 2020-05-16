import React from 'react'
import './src/styles/global.css'
import './src/tailwind.css'

import { AuthProvider } from './src/components/Spotify/authContext'
import { SpotifyPlayerProvider } from './src/components/Spotify/playerContext'

export const wrapRootElement = ({ element }) => (
  <AuthProvider location={window.location}>
    <SpotifyPlayerProvider>{element}</SpotifyPlayerProvider>
  </AuthProvider>
)
