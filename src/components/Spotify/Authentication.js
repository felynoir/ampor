import axios from 'axios'

export const loginSpotify = () => axios.get('http://localhost:8888/login')

export const isLoggedIn = async () => {
  if (
    localStorage.getItem('access_token') === null ||
    localStorage.getItem('refresh_token') === null ||
    localStorage.getItem('expires_in') === null
  )
    return false
  //check authorize by get spotify api/
  const access_token = localStorage.getItem('access_token')
  const res = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  if (res.status !== 200) return false
  return true
}

export const getOAuthToken = async () => {
  if (isExpired()) {
    const refresh_token = localStorage.getItem('refresh_token')
    const { data } = await axios.get(
      'http://localhost:8888/refresh_token?refresh_token' + refresh_token
    )
    localStorage.setItem(access_token, data.access_token)
  }
  const access_token = localStorage.getItem('access_token')
  return access_token
}

const isExpired = () => {
  const expires_in = localStorage.getItem(expires_in)
  return new Date(expires_in) < new Date()
}
