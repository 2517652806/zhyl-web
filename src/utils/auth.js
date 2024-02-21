import Cookies from 'js-cookie'
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

 
 
// 设置token
/* export const setToken = (newToken) => {
  localStorage.setItem(TokenKey, JSON.stringify(newToken))
}
 
// 获取token
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TokenKey))
}
 
// 删除token   
export const remToken = () => {
  localStorage.removeItem(TokenKey)
} */

// 清除所有localStorage的方法是 clear