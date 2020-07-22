// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import queryString from 'query-string'

const defaultContext = {
  isAuthenticated: false,
  getToken: () => {},
}

export const AuthContext = React.createContext(defaultContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children, location }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      const token = await getOAuthToken()
      if (token) {
        setIsAuthenticated(true)
        return
      }
      alert('fuck')
      const { search, pathname } = location
      const params = search ? queryString.parse(search) : {}
      if (
        params &&
        pathname &&
        params.access_token &&
        params.refresh_token &&
        params.expires_in
      ) {
        alert('yeah')
        localStorage.setItem('access_token', params.access_token)
        localStorage.setItem('refresh_token', params.refresh_token)
        localStorage.setItem('expires_in', params.expires_in)
        window.location.href = pathname
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
        if (!refresh_token) return
        const res = await Axios.get(
          `${process.env.AMPOR_API_URL}refresh_token?refresh_token=${refresh_token}`
        )
        const { access_token, expires_in } = res.data
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('expires_in', expires_in)
        return access_token
      } catch (e) {
        console.error(e)
        setIsAuthenticated(false)
        return
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
