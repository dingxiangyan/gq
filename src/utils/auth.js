import Cookies from 'js-cookie'

const TokenKey = 'sessionId'

// 验证是不是存在用户token
export function getToken() {
  // return "没有设置token";
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
