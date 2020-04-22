import React, { useEffect } from 'react'

import Layout from '../Layout'
import Helmet from 'react-helmet'
const token =
  'BQCPa0NrsVqd-pCNchqh_c_jRwZWFh58ZNyVlC3f58TQEbhn1QARko-9eySvkKyOx_OnScs0uUBtZgAR8RLn2siz_KHe3fUaRKzcXtt-VpYv_7Ydc9abmGes8_pYi6vXqvjERT71PqK3Mr4j5LSAm7dX_ASJAFLlp-oOJ5QZAA2Ku68IclqyapK0II0'

const SpotifyPlayback = () => {
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id },
    },
  }) => {
    // console.log(playerInstance)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('loaded')
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token)
        },
      })

      // Error handling
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

      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state)
      })

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.setName('Ampor').then(() => {
        console.log('Player name updated!')
      })

      // Connect to the player!
      player.connect()
    }
    console.log('use eff')
  }, [])

  return (
    <>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      SpotifyPlayback
      <button
        onClick={() =>
          play({
            playerInstance: new window.Spotify.Player({ name: 'Ampor' }),
            spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
          })
        }
      >
        Play
      </button>
    </>
  )
}

export default SpotifyPlayback
