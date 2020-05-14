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
  const [state, setState] = useState()
  const [isLoading, setIsLoading] = useState(true)

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
      player.addListener('player_state_changed', async state => {
        console.log('state', state)
        setState(state)
      })
      player.addListener('ready', async ({ device_id }) => {
        setSpotifyPlayer(player)
        setIsLoading(false)
      })
      player.addListener('not_ready', ({ device_id }) => {
        setIsLoading(true)
      })

      player.connect()
    }
  })

  return (
    <SpotifyPlayerContext.Provider
      value={{
        spotifyPlayer,
        state,
        isLoading,
      }}
    >
      {isAuthenticated && (
        <Helmet>
          <script src="https://sdk.scdn.co/spotify-player.js"></script>
        </Helmet>
      )}
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
