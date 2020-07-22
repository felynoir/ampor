import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Song/Layout'
import Lyric from '../components/Song/Lyric'

import Spotify from '../components/Spotify'
import { useAuth } from '../components/Spotify/authContext'

import styled from 'styled-components'
import Axios from 'axios'

import * as Vibrant from 'node-vibrant'

import shareThis from 'share-this'

import * as twitterSharer from 'share-this/dist/sharers/twitter'
import './sss.css'
import * as facebookSharer from 'share-this/dist/sharers/facebook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${props => {
    if (!props.bgColor) return 'linear-gradient(whitesmoke,black)'
    return `linear-gradient(${props.bgColor})`
  }};
  align-items: center;
`

const SpotifyLogin = styled.button`
  background: #1db954;
  color: white;
  border-radius: 500px;
  padding: 11px 32px 9px;
  padding-top: 11px;
  padding-right: 32px;
  padding-bottom: 9px;
  padding-left: 32px;
  display: inline-block;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const SongTemplate = ({ data }) => {
  const { isAuthenticated, getToken } = useAuth()
  const [bgColor, setBgColor] = useState()
  const { song, md } = data ? data : {}
  const { full_title, song_art_image_url } = song ? song : {}
  const { frontmatter: { spotifyURI, imgCover } = {}, html } = md ? md : {}

  useEffect(() => {
    const selectionShare = shareThis({
      selector: '#lyric',
      sharers: [twitterSharer, facebookSharer],
      popoverClass: 'popover',
    })

    selectionShare.init()

    Vibrant.from(imgCover)
      .getPalette()
      .then(palette => {
        const { _rgb: _rgbLight } = palette['Muted']
        const { _rgb: _rgbDark } = palette['DarkMuted']
        setBgColor(`rgb(${_rgbLight.join(', ')}), rgb(${_rgbDark.join(', ')})`)
      })
  }, [])

  const handleLoggin = async () => {
    if (typeof window === undefined) return
    const res = await Axios.get(`${process.env.AMPOR_API_URL}login`, {
      withCredentials: true,
    })
    console.log(document.cookie)
    if (res.status === 200 && !!res.data.location)
      window.location.href = res.data.location
  }

  return (
    <Container>
      <MediaContainer bgColor={bgColor} className="flex-col p-10">
        <img className="mx-auto" src={imgCover} />
        <div
          className="max-w-xs rounded-lg p-4 mt-4 text-white"
          style={{ background: 'rgba(0,0,0,0.2)' }}
        >
          <div className="text-center">
            <h2 className="text-sm md:text-xl">{full_title}</h2>
          </div>
          <div className="flex justify-center mt-3">
            {isAuthenticated ? (
              <Spotify getToken={getToken} spotifyURI={spotifyURI} />
            ) : (
              <SpotifyLogin onClick={() => handleLoggin()}>
                Spotify Login
              </SpotifyLogin>
            )}
          </div>
        </div>
      </MediaContainer>
      <div className="p-5 md:p-10">
        <Lyric html={html} />
      </div>
    </Container>
  )
}

const WrapLayoutToTemplate = props => {
  return (
    <Layout>
      <SongTemplate {...props} />
    </Layout>
  )
}

export default WrapLayoutToTemplate

export const pageQuery = graphql`
  query($geniusId: String!, $slug: String!) {
    song: songFromGenius(id: { eq: $geniusId }) {
      id
      full_title
      song_art_image_url
    }

    md: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        spotifyURI
        imgCover
      }
      html
    }
  }
`
