<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.levelCode === currentClassify.levelCode}" v-for="(item, index) in firstLevelList" :key="index" @click="getTwoClassify(item)">
        <b></b>
        <span>{{item.levelName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
        <div class="book-classify-item-title">{{item.levelName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodsList" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.goodsImage" alt="">
            <div>{{childItem.goodsName}}</div>
            <div>
              ￥{{childItem.price}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      firstLevelList: [],
      currentClassify: {},
      commList: [
        // {
        //   classifyId: '',
        //   classifyName: '小说',
        //   goodsList: [
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     }
        //   ]
        // },
        // {
        //   classifyId: '',
        //   classifyName: '散文',
        //   goodsList: [
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted () {
    this.getClassify()
  },
  methods: {
    // 一级分类
    getClassify () {
      req('getClassify', {}).then(data => {
        console.log(data)
        this.firstLevelList = data.data

        this.currentClassify = this.firstLevelList

        this.getTwoClassify(this.currentClassify)
      })
    },

    // 二级分类
    getTwoClassify (item) {
      this.currentClassify = item

      req('getTwoClassify', {levelCode: item.levelCode}).then(data => {
        console.log('222', data)
        this.commList = data.data
      })
    },
    getCommDetail (item) {
      sessionStorage.setItem('currentComm', JSON.stringify(item))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ddd;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 25%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 70%;
          }

          div:nth-child(2) {
            font-size: 12px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
