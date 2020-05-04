<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active: evaluateBtnType === 'all'}" @click="getEvaluate('', 'all')">全部评价</span>
      <span :class="{active: evaluateBtnType === 'perfect'}" @click="getEvaluate(5, 'perfect')">好评</span>
      <span :class="{active: evaluateBtnType === 'good'}" @click="getEvaluate(3, 'good')">中评</span>
      <span :class="{active: evaluateBtnType === 'differ'}" @click="getEvaluate(1, 'differ')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userCode}}</div>
              <div class="date">{{item.judgeTime}}</div>
            </div>

            <!-- <div
              class="star"
              :style="{backgroundPosition: `${90 - item.judgeLevel*18}px 0`}">
            </div> -->
            <el-rate v-model="item.judgeLevel" disabled></el-rate>
          </div>
          <div class="msg">{{item.judgeContent}}</div>
          <!-- <img :src="item.imagePath" alt=""> -->
          <div class="pic" v-for="(picItem , picIndex) in item.judgeImage" :key=" picIndex">
            <img :src="picItem.imagePath" alt="">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '3',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '2',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   judgeLevel: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // }
      ],
      evaluateBtnType: 'all'
    }
  },
  mounted () {
    this.getEvaluate('', 'all')
  },
  methods: {
    getEvaluate (judgeLevel = '', type) {
      // this.evaluateBtnType = type

      let commData = JSON.parse(sessionStorage.getItem('currentComm'))
      console.log(commData)
      let data = {
        goodsCode: commData.goodsCode,
        judgeGoodsLevel: judgeLevel,
        pageSize: 100,
        pageNum: 1
        // userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId
      }

      if (!judgeLevel) {
        delete data.judgeGoodsLevel
      }

      req('getEvaluate', {
        ...data
      }).then(data => {
        console.log(data)
        this.list = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
