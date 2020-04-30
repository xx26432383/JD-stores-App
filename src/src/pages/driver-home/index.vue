<template>
  <div>
    <div class="content">
      <div class="info">
        <img src="../../assets/u919.png" alt="">
        <span>2020020713270034</span>
      </div>
      <div class="order-msg">
        <ul>
          <li>{{msgList[0]}}</li>
          <li>{{msgList[1]}}</li>
        </ul>
      </div>
      <div class="line"></div>
        <div class="con-top">
          <ul>
            <li>{{topList[0]}}</li>
            <li>{{topList[1]}}</li>
        </ul>
        </div>
        <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-detail',
  data () {
    return {
      topList: [
        '店长：张丽丽',
        '手机：13745673313'
      ],
      msgList: [
        '门店：新华书店（新街口店）',
        '地址：江苏省南京市秦淮区中山东路65号'
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
      .line {
        width: 100%;
        height: 1px;
        background-color: rgb(204,204,204);
        margin: 5px 0;
      }
      .info span {
        font-weight: bold;
        position: relative;
        top: -5px;
        left: 5px;
      }
      .order-msg {
        margin: 10px 0;
      }
      li {
          padding: 10px 20px;
      }
    }
</style>
