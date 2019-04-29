<template>
  <div id="app">
    <el-container>
      <el-header style="padding: 0" v-if="$route.name !== 'login'">
        <v-header />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import VHeader from './views/layout/header'
export default {
  components: {
    VHeader
  },
  methods: {
    // 获取当前用户的会话
    async currentSession () {
      let res = await this.$axios(true).get('mem/session')
      if (res.data.status !== '200') {
        this.$router.push('/login')
        return
      }
      this.$store.commit('login', res.data.data)
    }
  },
  async beforeCreate () {
    // this.currentSession()
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-main {
  color: #333;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
