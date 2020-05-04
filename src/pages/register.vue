<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="80px">
      <el-form-item label="用户账号" prop="userAcct">
        <el-input v-model="formData.userAcct"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="password" v-model="formData.userPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="formData.phone"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="formData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="门店邀请码" prop="inviteCode" label-width="82px">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="image">
        <i-file v-model="formData.image"></i-file>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <el-button type="text" @click="toLogin">返回登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import IFile from '@/components/common/i-file.vue'
const qs = require('qs')

export default {
  name: 'register',
  components: {
    IFile
  },
  data () {
    return {
      formData: {},
      formRules: {
        userAcct: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        userName: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        userPwd: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        confirmUserPassword: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          { type: 'number', message: '手机号必须为数字' }
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trigger: 'change'},
          { validator: this.validateIdCard, trigger: 'change' }
        ],
        email: [
          {required: true, message: '请输入用户邮箱', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.userPwd !== this.formData.confirmUserPassword) {
            this.$message.info('两次输入的密码不一致')

            return
          }

          axios({
            method: 'post',
            url: 'http://305n9f4179.qicp.vip/app/register/clientRegister',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
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
    validateIdCard (rule, value, callback) {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      console.log(reg.test(value))

      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
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
