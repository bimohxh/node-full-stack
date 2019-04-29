<template>
<div class="header-box fixed-top">
  <h3 class="head-title">管理后台</h3>
  <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
    <template  v-for="(menu, index) in menus" >
      <el-menu-item :key="menu.name" :index="index + 1" v-if="!menu.children">
        <router-link :to="menu.href">{{menu.name}}</router-link>
      </el-menu-item>
      <el-submenu :key="menu.name" :index="index + 1" v-else>
        <template slot="title">{{menu.name}}</template>
        <el-menu-item :index="index + '-' + cindex" :key="child.name" v-for="(child, cindex) in menu.children">
          <router-link :to="child.href">{{child.name}}</router-link>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          name: '首页',
          href: '/'
        }, {
          name: '我的工作台',
          children: [
            {
              name: '子菜单',
              href: '/'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.header-box {
  display: flex;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0px 0px 10px #EEE;
  border-bottom: 1px solid #e4eaf5;
  padding: 0 10px;
  width: 100%;
  .head-title {
    padding: 0;
    margin: 0;
    color: #000;
  }
  .el-menu.el-menu--horizontal {
    flex-grow: 1;
    border-bottom: 0;
  }
 
}
.el-menu-item {
  a {
    text-decoration: none;
  }
}
</style>
