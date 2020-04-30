<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img src="../../assets/head_pic.png" >
        </div>
        <div class="text-con">Cayla Brister</div>
    </div>
    <!-- 普通用户 -->
    <div class="content" v-show="userType === 'user'">
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>

    <!-- 店长 -->
    <div class="content" v-show="userType === 'shop'">
      <div class="top-item" v-for="item in topList"
      :key="item.id">
          <div class="top-img-con">
              <img :src="item.img" :width="item.width">
          </div>
          <span>{{item.text}}</span>
      </div>
      <div
        class="con-item"
        v-for="(item,index) in conList2"
        :key="index"
        @click="toPage(item)">
          <div>
              <img :src="item.img1" alt="">
          </div>
          <div><span>{{item.label}}</span></div>
          <div>
              <img :src="item.img2" alt="">
          </div>
      </div>
    </div>

    <!-- 司机 -->
    <div class="content" v-show="userType === 'driver'">
      <div class="top-item">
          <div class="top-img-con" style="margin-right: 10px;">
              <img src="../../assets/u1210.png" alt="">
          </div>
          <span>滴师傅</span>
      </div>
      <div class="top-item">
          <div class="top-img-con" style="margin-right: 10px;">
              <img src="../../assets/u1151.png" alt="">
          </div>
          <span>123456798</span>
      </div>
      <div
        class="con-item"
        v-for="(item,index) in conList2"
        :key="index"
        @click="toPage(item)">
          <div>
              <img :src="item.img1" alt="">
          </div>
          <div><span>{{item.label}}</span></div>
          <div>
              <img :src="item.img2" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      topList: [
        {
          id: '001',
          img: require('../../assets/u919.png'),
          width: '18px',
          text: '门店：新华书店（新街口店）'
        }, {
          id: '002',
          img: require('../../assets/u1265.png'),
          width: '13px',
          text: '邀请码：600134'
        }, {
          id: '003',
          img: require('../../assets/u295.png'),
          width: '13px',
          text: '江苏省南京市秦淮区中山东路65号南京图书发行大厦'
        }
      ],
      conList: [
        {
          img1: require('../../assets/订单.png'),
          label: '我的订单',
          img2: require('../../assets/右.png'),
          toPath: '/order-list'
        }, {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/邀请码.png'),
          label: '修改店铺邀请码',
          img2: require('../../assets/右.png'),
          toPath: '/change-store-code'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      conList2: [
        {
          img1: require('../../assets/修改密码.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        }, {
          img1: require('../../assets/退出.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
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
      this.$router.push({path: data.toPath})
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
      width: 100%;
      display: flex;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          img {
              width: 65px;
              height: 65px;
              position: relative;
              left: 38%;
          }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }
  .content {
      width: 95%;
      height: 206px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .top-item {
          display: flex;
          padding: 5px 0 10px;
          .top-img-con {
              width: 30px;
              text-align: center;
          }
          span {
              font-size: 15px;
          }
        }
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
