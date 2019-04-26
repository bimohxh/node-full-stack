<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  async beforeCreate () {
    // 获取当前用户的会话
    let res = await this.$axios(true).get('mem/session')
    if (res.data.status !== '200') {
      this.$router.push('/login')
      return
    }
    this.$store.commit('login', res.data.data)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
