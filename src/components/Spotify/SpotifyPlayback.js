import React, { useEffect } from 'react'

import Layout from '../Layout'
import Helmet from 'react-helmet'
import withLocation from '../../utils/withLocation'

const SpotifyPlayback = ({ params, navigate, ...props }) => {
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id },
    },
  }) => {
    // console.log(playerInstance)
    getOAuthToken(token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    })
  }

  useEffect(() => {
    if (params.access_token && params.refresh_token && params.expires_in) {
      console.log(params)
      localStorage.setItem('access_token', params.access_token)
      localStorage.setItem('refresh_token', params.refresh_token)
      localStorage.setItem('expires_in', params.expires_in)
      navigate('/')
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb('token')
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
      })
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })
      player.setName('Ampor').then(() => {
        console.log('Player name updated!')
      })
      player.connect()
    }
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
            playerInstance: new window.Spotify.Player({
              name: 'Ampor',
              getOAuthToken: cb => {
                cb('token')
              },
            }),
            spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
          })
        }
      >
        Play
      </button>
    </>
  )
}

export default withLocation(SpotifyPlayback)
