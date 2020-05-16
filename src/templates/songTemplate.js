import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Song/Layout'
import TypingLetter from '../components/TypingLetter'

import Spotify from '../components/Spotify'
import { useAuth } from '../components/Spotify/authContext'

import styled from 'styled-components'
import Axios from 'axios'

import * as Vibrant from 'node-vibrant'

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
  const { frontmatter: { spotifyURI, imgCover } = {} } = md ? md : {}

  useEffect(() => {
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
    const res = await Axios.get('http://localhost:8888/login', {
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
      <div className="p-10">
        <p>
          [Verse 1]
          <br />
          Do you remember happy together?
          <br />I do, don't you?
          <br />
          Then all of a sudden, you're sick to your stomach
          <br />
          Is that still true?
          <br />
          <br />
          [Chorus]
          <br />
          You said, "forever," in the end I fought it
          <br />
          Please be honest, are we better for it?
          <br />
          Thought you'd hate me, but instead you called
          <br />
          And said, "I miss you"
          <br />I caught it
          <br />
          <br />
          [Verse 2]
          <br />
          Good to each other, give it the summer
          <br />I knew, you too
          <br />
          But I only saw you once in December
          <br />
          I'm still confused
          <br />
          <br />
          [Chorus]
          <br />
          You said, "forever," and I almost bought it
          <br />I miss fighting in your old apartment
          <br />
          Breaking dishes when you're disappointed
          <br />I still love you, I promise
          <br />
          Nothing happened in the way I wanted
          <br />
          Every corner of this house is haunted
          <br />
          And I know you said that we're not talking
          <br />
          But I miss you, I'm sorry
          <br />
          <br />
          [Outro]
          <br />I don't wanna go, think I'll make it worse
          <br />
          Everything I know brings me back to us
          <br />I don't wanna go, we've been here before
          <br />
          Everywhere I go leads me back to you
          <br />I don't wanna go, think I'll make it worse
          <br />
          <i>(You said, "forever," and I almost bought it)</i>
          <br />
          Everything I know brings me back to us
          <br />
          <i>(I miss fighting in your old apartment)</i>
          <br />I don't wanna go, we've been here before
          <br />
          <i>(Breaking dishes when you're disappointed)</i>
          <br />
          Everywhere I go leads me back to you
          <br />
          <i>(I still love you, I promise)</i>
          <br />I don't wanna go, think I'll make it worse
          <br />
          <i>(Nothing happened in the way I wanted)</i>
          <br />
          Everything I know brings me back to us
          <br />
          <i>(Every corner of this house is haunted)</i>
          <br />I don't wanna go, we've been here before
          <br />
          <i>(And I know you said that we're not talking)</i>
          <br />
          Everywhere I go leads me back to you
          <br />
          <i>(But I miss you)</i>
          <br />I don't wanna go, think I'll make it worse
          <br />
          Everything I know brings me back to us
          <br />I don't wanna go, we've been here before
          <br />
          Everywhere I go leads me back to you
        </p>
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
    }
  }
`
