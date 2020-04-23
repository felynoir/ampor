import axios from 'axios'

const getOAuthToken = async () => {
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
