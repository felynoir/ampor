// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'

const URL_ENDPOINT = 'http://localhost:8000'

const defaultContext = {
  isAuthenticated: false,
  getToken: () => {},
}

export const AuthContext = React.createContext(defaultContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children, location }) => {
  const [isAuthenticated, setIsAuthenticated] = useState()

  useEffect(() => {
    const initAuth = () => {
      const { params, navigate } = location
      if (
        params &&
        params.access_token &&
        params.refresh_token &&
        params.expires_in
      ) {
        console.log('ff')
        localStorage.setItem('access_token', params.access_token)
        localStorage.setItem('refresh_token', params.refresh_token)
        localStorage.setItem('expires_in', params.expires_in)
        navigate('/')
        setIsAuthenticated(true)
      }
    }
    initAuth()
  }, [])

  const isExpired = () => {
    const expires_in = localStorage.getItem('expires_in')
    return new Date(expires_in) < new Date()
  }

  const getToken = async () => {
    //check expired
    if (isExpired()) {
      // get news access token
      try {
        const refresh_token = localStorage.getItem('refresh_token')
        const res = await Axios.get(
          `${URL_ENDPOINT}/refresh_token?refresh_token=${refresh_token}`
        )
        if (res.status !== 200) return
        const access_token = res.data.access_token
        localStorage.setItem('access_token', access_token)
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
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
