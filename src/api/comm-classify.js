import req from '../fetch/index.js'

const config = {
  getClassify: {
    url: '/app/appGoods/listFirstLeveL',
    method: 'post'
  },
  getTwoClassify: {
    url: '/app/appGoods/listSecondLevelAndGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
