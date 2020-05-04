<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in judgeMgeLists" :key="index">
      <div class="pic-info">
          <img :src="item.imagePath" alt="">
          <span>{{item.goodsName}}</span>

        <!-- <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}">{{item.goodsLevel}}</div> -->
        <el-rate  v-model="item.goodsLevel" allow-half></el-rate>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.judgeContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div>
    <!-- <div class="comm" v-for="(item, index) in judgeMgeLists" :key="index">
      <div class="pic-info">
        <img :src="item.goodsImagePath" alt="">

        <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}"></div>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div> -->

    <el-button class="submit-btn" type="primary" @click="addEvaluate">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')

export default {
  name: 'order-evaluate',
  data () {
    return {
      judgeMgeLists: [],
      goodsLevel: {}
    }
  },
  mounted () {
    this.getEvaluate()
  },
  methods: {
    getEvaluate () {
      req('getEvaluate', {orderCode: this.$route.query.orderCode, userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId}).then(data => {
        console.log(data)
        this.judgeMgeLists = data.data
      })
    },
    addEvaluate () {
      axios({
        method: 'post',
        url: 'http://305n9f4179.qicp.vip/app/appOrder/addJudge',
        data: JSON.stringify({
          orderCode: this.$route.query.orderCode,
          userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId,
          judgeMgeLists: this.judgeMgeLists.map(item => {
            return Object.assign({}, {goodsCode: item.goodsCode, judgeContent: item.judgeContent, judgeLevel: item.goodsLevel}) // judgeLevel: item.goodsLevel
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          this.$message.success(data.data.msg)

          this.$router.push({path: '/order-list'})
        } else {
          this.$message.error(data.data.msg)
        }
      })
      // req('addEvaluate', {
      //   orderId: this.$route.query.orderId,
      //   judgeMgeLists: this.judgeMgeLists.map(item => {
      //     return Object.assign({}, {goodsId: item.goodsId, evaluateContent: item.evaluateContent, evaluateScore: '5'})
      //   })
      // }).then(data => {

      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .pic-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-rate {
        position: relative;
        left: -30px;
      }

      img {
        width: 150px;
        height: 150px;
      }
      span {
        position: relative;
        top: -50px;
        left: 80px;
        font-size: 20px;
      }

      .star {
        width: 180px;
        height: 36px;
        background: url('../../assets/stars.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
