import React, { useContext, useEffect, useState } from 'react'
import usePlayblack from './usePlayer'
import withLocation from '../../utils/withLocation'
import axios from 'axios'
import usePlayer from './usePlayer'
import Helmet from 'react-helmet'

const Spotify = ({ render, location, ...props }) => {
  const player = usePlayer()
  const [play, setPlayer] = useState(false)

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
