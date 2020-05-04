<template>
  <div class="container">
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getOrderList('', 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getOrderList(1, 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getOrderList(2, 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getOrderList(4, 'confirm')">已完成</li>
        </ul>
    </div>
    <!-- 普通客户 -->
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)" v-show="userType === 4 || userType === 2">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <!-- <span>{{item.orderStatus}}</span> -->
            <span>
                {{
                    item.orderStatus === 1 ? '已下单' :
                    item.orderStatus === 5 ? '已取消' :
                    item.orderStatus === 2 ? '已到货' :
                    item.orderStatus === 3 ? '已完成未评价' :
                    item.orderStatus === 4 ? '已完成已评价' :
                    '已完成已评价'
                }}
            </span>
        </div>
        <div class="item-center"  v-for="(childItem, index) in item.orderNotesList" :key="index">
            <div class="img-con">
                <img :src="childItem.imagePath" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childItem.goodsName}}
                </div>
                <div class="props-con">
                    {{childItem.goodsNotes}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{childItem.price}} &nbsp;</span>
                    <span>x{{childItem.amount}}</span>
                </div>
            </div>
        </div>
        <div class="shop-user-info" v-show="userType === 2">
            <img src="../../assets/u1056.png" alt="">
            张三
            <img src="../../assets/u1060.png" alt="">
            13511111111
        </div>
        <div class="item-bottom">
            <span>共{{item.amount}}件商品，合计￥</span>
            <span>{{item.orderAllPrice}}</span>
        </div>
         <!-- 普通客户 -->
        <div class="item-more" v-show="userType === 4">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, 5)"
              v-show="item.orderStatus === 1">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item)" v-show="item.orderStatus === 3">
                <span>评价</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 3)" v-show="item.orderStatus === 2">
                <span>确认收货</span>
            </div>
        </div>
        <!-- 店长 -->
        <div class="item-more" v-show="userType === 2">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, 5)"
              v-show="item.orderStatus === 1 || item.orderStatus === 2">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 2)" v-show="item.orderStatus === 1">
                <span>确认到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 1)" v-show="item.orderStatus === 2">
                <span>取消到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 3)" v-show="item.orderStatus === 2">
                <span>确认取货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, 2)" v-show="item.orderStatus === 3">
                <span>取消取货</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [
      ],
      orderType: 'all'
    }
  },
  computed: {
    userType () {
      // return this.$store.state.userType
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted () {
    this.getOrderList('', 'all')
  },
  methods: {
    getOrderList (orderStatus = '', type) {
      let data = {
        orderStatus: orderStatus,
        pageSize: 100,
        pageNum: 1,
        userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId
      }
      console.log(data)

      if (!orderStatus) {
        delete data.orderStatus
      }

      this.orderType = type
      // if (this.$store.state.userType === '4')
      if (JSON.parse(sessionStorage.getItem('roleInfo')).role === 4) {
        req('getOrderList', {
          ...data
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.list = data.data.list
          } else {
            this.$message.info(data.msg)
          }
        })
      } else {
        req('getShopOrderList', {
          ...data
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.list = data.data.list
          } else {
            this.$message.info(data.msg)
          }
        })
      }
    },
    toPage (data) {
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate', query: data})
    },
    changeOrderStatus (item, changeStatus) {
      this.$confirm('确定进行该操作吗?').then(() => {
        req('changeOrderStatus', {orderCode: item.orderCode, orderStatus: changeStatus}).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)

            this.getOrderList('', this.orderType)
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .leader {
      height: 64px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .info {
        margin: 10px 0px;
        .info-box {
            padding: 0px 15px;
        }
      }
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
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
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                font-size: 11px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                  // font-size: 15px;
                  // position: absolute;
                  // top: 50%;
                  // left: 37%;
                  // margin-top: -10.4px;
                  // margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
