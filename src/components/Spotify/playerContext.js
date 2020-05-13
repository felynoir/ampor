import React, { useState, useContext, useEffect } from 'react'
import Helmet from 'react-helmet'
import { useAuth } from './authContext'

const defaultContext = {
  spotifyPlayer: null,
  state: {},
}

export const SpotifyPlayerContext = React.createContext(defaultContext)
export const useSpotifyPlayer = () => useContext(SpotifyPlayerContext)

export const SpotifyPlayerProvider = ({ children }) => {
  const { isAuthenticated, getToken } = useAuth()
  const [spotifyPlayer, setSpotifyPlayer] = useState()
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!isAuthenticated) return

      const player = new window.Spotify.Player({
        name: 'Ampor',
        getOAuthToken: cb => {
          cb(getToken())
        },
      })

      player.addListener('initialization_error', ({ message }) => {
        console.error('1', message)
      })
      player.addListener('authentication_error', ({ message }) => {
        console.error('2', message)
      })
      player.addListener('account_error', ({ message }) => {
        console.error('3', message)
      })
      player.addListener('playback_error', ({ message }) => {
        console.error('4', message)
      })
      player.addListener('player_state_changed', state => {
        console.log(state)
      })
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        setSpotifyPlayer(player)
      })
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })
      player.connect()
    }
  })

  return (
    <SpotifyPlayerContext.Provider
      value={{
        spotifyPlayer,
      }}
    >
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
