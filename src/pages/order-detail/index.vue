<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/卡车.png" style="width: 18px;">
                </div>
                <span>取货门店:{{orderDetail.storesName}}</span>
            </div>
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/position2.png" style="width: 13px;">
                </div>
                <span>{{orderDetail.storesAddress}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="item of orderDetail.orderNotesList" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.imagePath">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsNotes}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.price}} </span>
                        <span>x{{item.amount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{orderDetail.goodsSum}}件商品，合计￥</span>
            <span>{{orderDetail.orderAllPrice}}</span>
        </div>
        <div class="shop-user-info" v-show="userType === 2">
          <div>
            <img src="../../assets/u1056.png" alt="">
            {{orderDetail.clientUserName}}
          </div>
          <div>
            <img src="../../assets/u1060.png" alt="">
            {{orderDetail.clientUserPhone}}
          </div>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderDetail.orderCode}}</li>
            <li>{{orderDetail.createTime}}</li>
            <li style="color: red;">{{orderType}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-detail.js'
export default {
  name: 'order-detail',
  data () {
    return {
      // topList: [
      //   {
      //     id: '001',
      //     img: require('../../assets/卡车.png'),
      //     width: '18px',
      //     text: '取货门店：新华书店（新街口店）'
      //   }, {
      //     id: '002',
      //     img: require('../../assets/position2.png'),
      //     width: '13px',
      //     text: '江苏省南京市秦淮区中山东路65号南京图书发行大厦'
      //   }
      // ],
      orderDetail: {}
      // orderList: [
      //   {
      //     id: '001',
      //     adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
      //     img: require('../../assets/book1.jpg'),
      //     prop: '重量：0.32kg 系列：一生自在系列',
      //     price: '42.80',
      //     number: '1',
      //     count: '42.80'
      //   }
      // ],
      // msgList: [
      //   '2020020713270034',
      //   '2020-02-11 11:54:01',
      //   '已付款'
      // ],
      // msgList1: [
      //   '2020020713270034',
      //   '2020-02-11 11:54:01',
      //   '待取货'
      // ]
    }
  },
  computed: {
    userType () {
      // return this.$store.state.userType
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
    orderType () {
      if (this.orderDetail.orderStatus === 1) {
        return '已下单'
      } else if (this.orderDetail.orderStatus === 2) {
        return '已到货'
      } else if (this.orderDetail.orderStatus === 3) {
        return '已完成未评价'
      } else if (this.orderDetail.orderStatus === 4) {
        return '已完成已评价,'
      } else {
        return '已取消'
      }
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      if (this.userType === 4) {
        req('getClientDetail', {orderCode: this.$route.query.orderCode}).then(data => {
          console.log(data)
          this.orderDetail = data.data
          // this.orderList = data.data.goodsList
        })
      } else {
        req('getShopDetail', {orderCode: this.$route.query.orderCode}).then(data => {
          console.log(data)
          this.orderDetail = data.data
          // this.orderList = data.data.goodsList
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 22px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span {
                  font-size: 15px;
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .info {
        div:nth-child(1) {
          position: relative;
          top: 10px;
          padding: 0 5px;
        }
        div:nth-child(2) {
          padding: 5px 0;
        }
        img {
          padding: 5px 10px;
        }
        span {
          position: relative;
          top: -10px
        }
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 84px;
                  }
              }
              .text {
                  flex: 2.2;
                  .text-con {
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                  }
                  .price-con {
                      text-align: right;
                      line-height: 26px;
                      span:nth-child(1) {
                          font-size: 11px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 16px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(3) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
          .item-bottom {
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
</style>
