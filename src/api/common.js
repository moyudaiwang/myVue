import axios from 'axios'

// 登录
export const login = params => {
  return axios.post('/api/web/portal/login', params)
}
// 注册
export const register = params => {
  return axios.post('/api/web/portal/register', params)
}
