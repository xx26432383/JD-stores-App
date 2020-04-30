
import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getDetail: {
    url: '/app/appGoods/findGoodsById',
    method: 'post'
  },
  payNow: {
    url: '/app/appOrder/addOrder',
    method: 'post'
  },
  addShopCar: {
    url: '/app/appShopCar/addShopCar',
    method: 'post'
  },
  // 查询商品评价接口
  getCommEvaluates: {
    url: '/app/appGoods/listGoodsJudge',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
