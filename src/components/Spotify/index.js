import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import usePlayer from './usePlayer'
import { useAuth } from './authContext'
import Helmet from 'react-helmet'

const Spotify = props => {
  // const { isAuthenticated, getToken } = useAuth()
  // const [player] = usePlayer(() => 'fff')
  const [playing, setPlaying] = useState(false)
  const isFirstRender = useRef(true)

  const callAPI = async ({ url, method, data }) => {
    // const access_token = await getToken()
    // console.log(access_token)
    // axios({
    //   url,
    //   method,
    //   data,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // })
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
      HEY
    </>
  )
}

export default Spotify
