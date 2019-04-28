<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  async beforeCreate () {
    // 获取当前用户的会话
    // let res = await this.$axios(true).get('mem/session')
    // if (res.data.status !== '200') {
    //   this.$router.push('/login')
    //   return
    // }
    // this.$store.commit('login', res.data.data)
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
}
.el-main {
  color: #333;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
