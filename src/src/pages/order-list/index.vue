<template>
  <div>
    <div class="leader">
        <ul>
            <li class="active">全部订单</li>
            <li>已付款</li>
            <li>待取货</li>
            <li>已完成</li>
        </ul>
    </div>
    <!-- 普通客户 -->
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)"
    v-show="userType === 'user'">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderNum}}</span>
            <span>{{item.orderStatus}}</span>
        </div>
        <div class="item-center">
            <div class="img-con">
                <img :src="item.img" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.adv}}
                </div>
                <div class="props-con">
                    {{item.prop}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.price}} &nbsp;</span>
                    <span>x{{item.number}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.number}}件商品，合计￥</span>
            <span>{{item.count}}</span>
        </div>
        <div class="item-more" v-show="item.orderStatus == '已完成'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div>
    </div>

    <!-- 店长 -->
    <div class="order-item" v-for="item of list2" :key="item.index" @click="toPage(item)"
    v-show="userType === 'shop'">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderNum}}</span>
            <span>{{item.orderStatus}}</span>
        </div>
        <div class="item-center">
            <div class="img-con">
                <img :src="item.img" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{item.adv}}
                </div>
                <div class="props-con">
                    {{item.prop}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item.price}} &nbsp;</span>
                    <span>x{{item.number}}</span>
                </div>
            </div>
        </div>

        <div class="info">
            <span class="info-box">
                <img :src="item.img1" alt="">
                <span>{{item.name}}</span>
            </span>
            <span>
                <img :src="item.img2" alt="">
                <span>{{item.phone}}</span>
            </span>
        </div>

        <div class="item-bottom">
            <span>共{{item.number}}件商品，合计￥</span>
            <span>{{item.count}}</span>
        </div>
        <div class="item-more" v-show="item.orderStatus == '已完成'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-list',
  data () {
    return {
      list: [
        {
          id: '001',
          orderNum: '2020020713270034',
          orderStatus: '已付款',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          count: '42.80'
        }, {
          id: '002',
          orderNum: '2020020713270034',
          orderStatus: '已完成',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          count: '42.80'
        }
      ],
      list2: [
        {
          id: '001',
          orderNum: '2020020713270034',
          orderStatus: '待取货',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          img1: require('../../assets/u1056.png'),
          img2: require('../../assets/u1060.png'),
          name: '张三三',
          phone: '123456789',
          count: '42.80'
        }
      ]
    }
  },
  computed: {
    userType () {
      return this.$store.state.userType
    }
  },
  methods: {
    toPage (data) {
      this.$router.push({path: '/order-detail'})
    },
    evaluate (data) {
      console.log(data)
      this.$router.push({path: '/order-evaluate'})
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
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
</style>
