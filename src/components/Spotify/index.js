import React, { useContext, useEffect, useState } from 'react'
import usePlayblack from './usePlayer'
import withLocation from '../../utils/withLocation'
import axios from 'axios'
import usePlayer from './usePlayer'
import Helmet from 'react-helmet'

const Spotify = ({ render, location, ...props }) => {
  const player = usePlayer()
  const [play, setPlayer] = useState(false)

  console.log(player)
  const callAPI = async ({ url, method, data }) => {
    const {
      _options: { getOAuthToken, id },
    } = player
    await getOAuthToken(access_token => {
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
    })
  }

  const setPlay = async () => {
    const url = play
      ? 'https://api.spotify.com/v1/me/player/pause'
      : 'https://api.spotify.com/v1/me/player/play'
    await callAPI({ url, method: 'PUT' })
    setPlayer(!play)
  }

  useEffect(() => {
    const { params, navigate } = props
    console.log(location)
    console.log(params, props)
    if (params.access_token && params.refresh_token && params.expires_in) {
      localStorage.setItem('access_token', params.access_token)
      localStorage.setItem('refresh_token', params.refresh_token)
      localStorage.setItem('expires_in', params.expires_in)
      navigate('/')
    }
  }, [props.params])

  return (
    <>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      {render({ play, setPlay })}
    </>
  )
}

export default withLocation(Spotify)
