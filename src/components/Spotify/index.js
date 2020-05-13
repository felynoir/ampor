import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import usePlayer from './usePlayer'
import Helmet from 'react-helmet'
import PlayPauseButton from '../AudioPlayer/PlayPauseButton'

const Spotify = ({ getToken }) => {
  const { player } = usePlayer(getToken)
  const [playing, setPlaying] = useState(false)
  const isFirstRender = useRef(true)

  const callAPI = async ({ url, method, data }) => {
    const access_token = await getToken()
    console.log(access_token)
    axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const url = playing
      ? 'https://api.spotify.com/v1/me/player/pause'
      : 'https://api.spotify.com/v1/me/player/play'
    callAPI({ url, method: 'PUT' })
  }, [playing])

  return (
    <>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
    </>
  )
}

export default Spotify
