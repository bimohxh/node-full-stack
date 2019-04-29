<template>
  <el-container class="container">
    <el-card class="login-box">
      <div slot="header">
        <span>Login</span>
      </div>
      <div style="padding: 30px">
        <el-form ref="form"  label-width="0">
          <el-form-item>
            <el-input v-model="account.uid" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="account.pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-container>
</template>

<script>
const store = require('store')
export default {
  name: 'login',
  data () {
    return {
      account: {
        uid: '',
        pwd: ''
      }
    }
  },
  methods: {
    async submit () {
      // 登录
      let res = await this.$axios().post('mem/login', this.account)
      if (res.data.status !== '200') {
        return
      }
      store.set('token', res.data.data[0].token)
      // 获取用户信息
      res = await this.$axios(true).get('mem/session')
      if (res.data.status !== '200') {
        return
      }

      this.$store.commit('login', res.data.data)
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 400px;
}

.container {
  align-items: center;
  justify-content: center;
}

</style>