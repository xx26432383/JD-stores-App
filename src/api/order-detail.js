import req from '../fetch/index.js'

const config = {
  getClientDetail: {
    url: '/app/appOrder/findOrderById',
    method: 'post'
  },
  getShopDetail: {
    url: '/app/manangerOrder/findOrderById',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
