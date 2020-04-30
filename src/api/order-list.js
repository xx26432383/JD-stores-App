import req from '../fetch/index.js'

const config = {
  getOrderList: {
    url: '/app/appOrder/listOrder',
    method: 'post'
  },
  getShopOrderList: {
    url: '/app/manangerOrder/listManagerOrders',
    method: 'post'
  },
  changeOrderStatus: {
    url: '/app/appOrder/updateOrderStatus',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
