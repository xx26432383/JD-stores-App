import req from '../fetch/index.js'

const config = {
  getShopData: {
    url: '/app/appShopCar/listShopCar',
    method: 'post'
  },
  addOrder: {
    url: '/app/appOrder/addOrder',
    method: 'post'
  },
  deleteShopCar: {
    url: '/app/appShopCar/deleteShopCar',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
