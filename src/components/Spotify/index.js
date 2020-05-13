import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import usePlayer from './playerContext'
import Helmet from 'react-helmet'
import PlayPauseButton from '../AudioPlayer/PlayPauseButton'

import { errorHandler } from './errorHandler'

const Spotify = ({ getToken }) => {
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState()
  const isFirstRender = useRef(true)

  const callAPI = async ({ url, method, data }) => {
    try {
      const access_token = await getToken()
      console.log(access_token)
      const res = await axios({
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
      setError()
    } catch (e) {
      setError(errorHandler(e.response.data.error))
    }
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
      {error}
      <PlayPauseButton playing={playing} setPlaying={setPlaying} />
    </>
  )
}

export default Spotify
