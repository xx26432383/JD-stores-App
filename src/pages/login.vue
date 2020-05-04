<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" ref="form" :rules="formRules" inline label-width="65px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <el-button type="text" @click="$router.push({path: '/register'})">我要注册</el-button>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
// import req from '@/api/global.js'
import axios from 'axios'
const qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://305n9f4179.qicp.vip/uaa/auth/form',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            console.log(data)
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
              // setTimeout(() => {
              //   this.$router.push({path: '/mine'})
              // })
              this.getUserInfo()
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    getUserInfo (token) {
      axios({
        method: 'post',
        url: 'http://305n9f4179.qicp.vip/app/my/getUser',
        data: qs.stringify({access_token: token, userAcct: this.formData.username}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        console.log('信息', data)
        if (data.data.code === 0) {
          sessionStorage.setItem('roleInfo', JSON.stringify(data.data.data))
          // sessionStorage.setItem('roleInfo', JSON.stringify(data.data))

          if (data.data.data.role === 4) {
            this.$router.push({path: '/home'})
          } else if (data.data.data.role === 3) {
            this.$router.push({path: '/driver-shop-info'})
          } else {
            // req('getManagerInfo', {...this.formData}).then(data => {
            //   sessionStorage.setItem('roleInfo', JSON.stringify(data.data.data))

            //   if (data.data.data.role === 2) {
            this.$router.push({path: '/order-list'})
            //   }
            // })
          }
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    }
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
