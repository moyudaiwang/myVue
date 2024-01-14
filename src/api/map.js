import axios from 'axios'

// 查询地图菜单信息
export const initMapMenu = params => {
  return axios.post('/api/web/map/initMapMenu', params)
}

// 查询地图点位信息
export const queryMapPoints = params => {
  return axios.post('/api/web/map/queryMapPoints', params)
}
