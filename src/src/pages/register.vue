<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="formData.userAcct"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.mail"></el-input>
      </el-form-item>
      <el-form-item label="邀请码">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      formData: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
</style>
