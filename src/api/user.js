import axios from 'axios'

let host = window.g.ApiUrl

// 注册
export const postRegister = params => { return axios.post(`${host}/api/register/`, { params: params }) }

