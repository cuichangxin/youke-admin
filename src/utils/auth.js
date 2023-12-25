import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

const isLogin = () => {
  return !!Cookies.get(TOKEN_KEY)
}

const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

const setToken = (token) => {
  return Cookies.set(TOKEN_KEY, token)
}

const clearToken = () => {
  return Cookies.remove(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }