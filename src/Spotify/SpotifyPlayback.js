import React, { useRef, useEffect } from 'react'

import Layout from '../components/Layout'
import Helmet from 'react-helmet'

const SpotifyPlayback = () => {
  const audioPlayerState = useAudioPlayer()

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('loaded')
      const token =
        'BQCch3ne7XIZo2se_IOKSpnVEfv2IbAU6GvvWtb9hZVNXF7AzsO6KWKpmYyKGE6C-Xgo6DWrw3PTcfVVInsuQJPfOP1vQ7pcGRcWyCJG6oXZcpSPKSkg-l_nFh35Zy1hC1iA15cJEOpP9X8pYJjeubC4rFrXciQDPcwYVs3nA0o5TLT21dktTmwNNhE'
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token)
        },
      })

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('authentication_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('account_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('playback_error', ({ message }) => {
        console.error(message)
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

      // Connect to the player!
      player.connect()
    }
    console.log('use eff')
  }, [])

  return (
    <Layout>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      SpotifyPlayback
    </Layout>
  )
}

export default SpotifyPlayback
