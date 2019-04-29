<template>
  <div id="app">
    <el-container>
      <el-header class="p-0" v-if="$route.name !== 'login'">
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

<style lang="scss">
@import "../node_modules/bootstrap/scss/_functions.scss";
@import "../node_modules/bootstrap/scss/_variables.scss";
@import "../node_modules/bootstrap/scss/_mixins.scss";
@import "../node_modules/bootstrap/scss/_utilities.scss";
@import "../node_modules/bootstrap/scss/_reboot.scss";

html, body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fb;
}
.el-header, .el-footer {
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

.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  box-shadow: 0 1px 10px 0 rgba(0,0,0,.05)!important;
  border: 1px solid #e4eaf5;
}
</style>
