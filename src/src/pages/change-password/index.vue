<template>
  <div>
    <div class="pwd-con">
        <div class="pwd-item" v-for="(item,index) in conList"
        :key="index">
            <div class="item-left">{{item.label}}</div>
            <input type="text" :placeholder="item.placeholder">
        </div>
    </div>
    <div class="btn">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'change-password',
  data () {
    return {
      conList: [
        {
          label: '原密码',
          placeholder: '请输入原密码'
        }, {
          label: '新密码',
          placeholder: '请输入新密码'
        }, {
          label: '确认新密码',
          placeholder: '请再次输入新密码'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
