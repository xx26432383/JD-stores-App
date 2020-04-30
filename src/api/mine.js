import req from '../fetch/index.js'

const config = {
  getClientUser: {
    url: 'app/my/getClientUser',
    method: 'post'
  },
  getDriverInfo: {
    url: 'app/driverHome/getUser',
    method: 'post'
  },
  getManagerInfo: {
    url: 'app/manangerOrder/getUser',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
