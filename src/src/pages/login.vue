<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="55px">
      <el-form-item label="用户名">
        <el-input v-model="formData.clientAcct"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.pwd"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formData: {
        clientAcct: '',
        pwd: ''
      }
    }
  },
  methods: {
    login () {}
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
</style>
