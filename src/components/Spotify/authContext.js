// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'

const URL_ENDPOINT = 'http://localhost:8888'

const defaultContext = {
  isAuthenticated: false,
  getToken: () => 'fewfew',
}

export const AuthContext = React.createContext(defaultContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children, location, params, navigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      if (
        params &&
        params.access_token &&
        params.refresh_token &&
        params.expires_in
      ) {
        localStorage.setItem('access_token', params.access_token)
        localStorage.setItem('refresh_token', params.refresh_token)
        localStorage.setItem('expires_in', params.expires_in)
        navigate(location.pathname)
        setIsAuthenticated(true)
      }
    }
    initAuth()
  }, [])

  const isExpired = () => {
    const expires_in = localStorage.getItem('expires_in')
    return new Date(expires_in) < new Date()
  }

  const getOAuthToken = async () => {
    //check expired
    if (isExpired()) {
      // get news access token
      try {
        const refresh_token = localStorage.getItem('refresh_token')
        const res = await Axios.get(
          `${URL_ENDPOINT}/refresh_token?refresh_token=${refresh_token}`
        )
        if (res.status !== 200) return
        const { access_token, expires_in } = res.data
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('expires_in', expires_in)
        return access_token
      } catch (e) {
        console.log(e)
      }
    }
    return localStorage.getItem('access_token')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getToken: () => getOAuthToken(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
