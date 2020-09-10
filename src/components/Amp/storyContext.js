import React, { useState, useContext, useEffect } from 'react'
import Helmet from 'react-helmet'

const defaultContext = {
  AmpStory: null,
  state: {},
}

export const AmpStoryContext = React.createContext(defaultContext)
export const useAmpStory = () => useContext(AmpStoryContext)

export const AmpStoryProvider = ({ children }) => {
  useEffect(() => {
    console.log('using amp-story')
  }, [])

  return (
    <AmpStoryContext.Provider value={{}}>
      <Helmet>
        <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
        ></script>
        <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      {children}
    </AmpStoryContext.Provider>
  )
}
