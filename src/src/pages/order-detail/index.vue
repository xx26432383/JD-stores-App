<template>
  <div>
<!-- 普通用户 -->
    <div  v-show="userType === 'user'">
      <div class="content">
          <div class="con-top">
              <div class="top-item" v-for="item in topList"
              :key="item.id">
                  <div class="top-img-con">
                      <img :src="item.img" :width="item.width">
                  </div>
                  <span>{{item.text}}</span>
              </div>
          </div>
          <div class="line"></div>
          <div class="order-item" v-for="item of orderList" :key="item.id">
              <div class="item-center">
                  <div class="img-con">
                      <img :src="item.img">
                  </div>
                  <div class="text">
                      <div class="text-con">{{item.adv}}</div>
                      <div class="props-con">{{item.prop}}</div>
                      <div class="price-con">
                          <span>￥</span>
                          <span>{{item.price}} </span>
                          <span>x{{item.number}}</span>
                      </div>
                  </div>
              </div>
              <div class="item-bottom">
                  <span>共{{item.number}}件商品，合计￥</span>
                  <span>{{item.count}}</span>
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
              <li>{{msgList[0]}}</li>
              <li>{{msgList[1]}}</li>
              <li class="active">{{msgList[2]}}</li>
          </ul>
      </div>
    </div>

<!-- 店长 -->
    <div  v-show="userType === 'shop'">
      <div class="content" style="margin: 0px auto 12px;">
        <div class="order-msg" style="position: relative; left: -30px;">
            <ul>
                <li>订单信息</li>
                <li>订单编号：</li>
                <li>创建时间：</li>
                <li>订单状态：</li>
            </ul>
            <ul>
                <li></li>
                <li>{{msgList1[0]}}</li>
                <li>{{msgList1[1]}}</li>
                <li class="active">{{msgList1[2]}}</li>
            </ul>
          </div>
          <div class="line"></div>
          <div class="info">
            <div>
              <img src="../../assets/u1157.png" alt="">
              <span>张无忌</span>
            </div>
            <div>
              <img src="../../assets/u1151.png" alt="">
              <span>123465798</span>
            </div>
          </div>
          <div class="line"></div>
          <div class="con-top">
              <div class="top-item" v-for="item in topList"
              :key="item.id">
                  <div class="top-img-con">
                      <img :src="item.img" :width="item.width">
                  </div>
                  <span>{{item.text}}</span>
              </div>
          </div>
          <div class="line"></div>
          <div class="order-item" v-for="item of orderList" :key="item.id">
              <div class="item-center">
                  <div class="img-con">
                      <img :src="item.img">
                  </div>
                  <div class="text">
                      <div class="text-con">{{item.adv}}</div>
                      <div class="props-con">{{item.prop}}</div>
                      <div class="price-con">
                          <span>￥</span>
                          <span>{{item.price}} </span>
                          <span>x{{item.number}}</span>
                      </div>
                  </div>
              </div>
              <div class="item-bottom">
                  <span>共{{item.number}}件商品，合计￥</span>
                  <span>{{item.count}}</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-detail',
  data () {
    return {
      topList: [
        {
          id: '001',
          img: require('../../assets/卡车.png'),
          width: '18px',
          text: '取货门店：新华书店（新街口店）'
        }, {
          id: '002',
          img: require('../../assets/position2.png'),
          width: '13px',
          text: '江苏省南京市秦淮区中山东路65号南京图书发行大厦'
        }
      ],
      orderList: [
        {
          id: '001',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          count: '42.80'
        }
      ],
      msgList: [
        '2020020713270034',
        '2020-02-11 11:54:01',
        '已付款'
      ],
      msgList1: [
        '2020020713270034',
        '2020-02-11 11:54:01',
        '待取货'
      ]
    }
  },
  computed: {
    userType () {
      return this.$store.state.userType
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
