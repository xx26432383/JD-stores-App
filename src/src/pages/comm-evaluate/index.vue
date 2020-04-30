<template>
  <div class="container">
    <div class="evaluate-title">
      <span class="active">全部评价</span>
      <span>好评</span>
      <span>中评</span>
      <span>差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userAcct}}</div>
              <div class="date">{{item.createTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.evaluateScore*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.evaluateContent}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '1',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        },
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '3',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        },
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '5',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        },
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '2',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        },
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '5',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        },
        {
          userAcct: 'Cvita Doleschall',
          evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
          evaluateScore: '1',
          createTime: '2020-01-01 11:11:11',
          imageList: []
        }
      ]
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
