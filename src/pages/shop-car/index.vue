<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.goodsImage" alt="">
          <div>
            <div>{{item.goodsName}}</div>
            <div>重量：0.32kg 系列：一生自在系列</div>
            <div>
              <span>￥{{item.price}}</span>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{item.carGoodsCount}}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{totalPrice.toFixed(2)}}</span>
        </div>

        <button @click="addShopCar">结算</button>
        <button @click="deleteShopCar">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'
export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPrice: 0,
      list: []
    }
  },
  mounted () {
    this.getShopCarList()
    // let list = [
    //   {
    //     goodsCode: '1',
    //     goodsName: '三国演义1',
    //     goodsImagePath: '',
    //     price: '101.1',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   },
    //   {
    //     goodsCode: '2',
    //     goodsName: '三国演义2',
    //     goodsImagePath: '',
    //     price: '63',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   },
    //   {
    //     goodsCode: '3',
    //     goodsName: '三国演义3',
    //     goodsImagePath: '',
    //     price: '52.3',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   },
    //   {
    //     goodsCode: '4',
    //     goodsName: '三国演义4',
    //     goodsImagePath: '',
    //     price: '155',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   },
    //   {
    //     goodsCode: '5',
    //     goodsName: '三国演义5',
    //     goodsImagePath: '',
    //     price: '78.45',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   },
    //   {
    //     goodsCode: '6',
    //     goodsName: '三国演义6',
    //     goodsImagePath: '',
    //     price: '32.1',
    //     carGoodsCount: 1,
    //     shopCarCode: '1'
    //   }
    // ]

    // this.list = list.map(item => {
    //   return Object.assign(item, {checked: false})
    // })
  },
  methods: {
    getShopCarList () {
      req('getShopData', {pageSize: 100, pageNum: 1, userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId}).then(data => {
        console.log(data)
        this.list = data.data.list.map(item => {
          return Object.assign({}, item, {checked: false})
        })

        this.allChecked = false
        this.totalPrice = this.getTotal()
      })
    },
    addShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要购买的商品')

        return
      }

      let goodsCodes = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.goodsCode
      }).toString()

      let prices = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.price
      }).toString()

      let clientGoodsNums = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.carGoodsCount
      }).toString()

      let shopCarCodes = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.shopCarCode
      }).toString()

      req('addOrder', {
        goodsCode: goodsCodes,
        price: prices,
        amount: clientGoodsNums,
        shopCarCode: shopCarCodes,
        userId: JSON.parse(sessionStorage.getItem('roleInfo')).userId
        // userId: this.$store.state.userType.userId
      }).then(data => {
        console.log('111', data)
        if (data.code === 0) {
          this.$message.success(data.msg)

          setTimeout(() => {
            this.$router.push({path: '/order-list'})
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    deleteShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$message.info('请先选择需要删除的商品')

        return
      }

      let shopCarCodes = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.shopCarCode
      }).toString()

      req('deleteShopCar', {shopCarCode: shopCarCodes}).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.$message.success(data.msg)

          this.getShopCarList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 全选按钮
    allInputChange () {
      this.allChecked = !this.allChecked

      this.list.forEach(item => {
        item.checked = this.allChecked
      })

      this.totalPrice = this.getTotal()
    },

    // 单选按钮
    inputChange (item) {
      // console.log(item)
      item.checked = !item.checked

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === false) {
          this.allChecked = false

          break
        } else {
          this.allChecked = true
        }
      }
      // let index = this.list.findIndex(listItem => {
      //   return listItem.goodsCode === item.goodsCode
      // })

      // this.$nextTick(() => {
      //   this.$set(this.list[index], 'checked', !this.list[index].checked)
      // })
      this.totalPrice = this.getTotal()
    },
    countDelete (data) {
      if (data.carGoodsCount > 1) {
        data.carGoodsCount = parseFloat(data.carGoodsCount) - 1
      }
      this.totalPrice = this.getTotal()
    },
    countAdd (data) {
      data.carGoodsCount = parseFloat(data.carGoodsCount) + 1
      this.totalPrice = this.getTotal()
    },
    getTotal () {
      let total = 0

      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.carGoodsCount * item.price)
        }
      })

      return parseFloat(total.toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 110px;
}
  .book-list {
    width: 100%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        >img {
          height: 80%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 14px;
            width: 100%;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
          }

          > div:nth-child(2) {
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;

      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 80px;
      height: 40px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 20px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}

</style>
