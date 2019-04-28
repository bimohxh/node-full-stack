<template>
  <el-card class="table-card">
    <table-list table="user" :params="params">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
    </table-list>
  </el-card>
</template>

<script>
import TableList from '@/components/table-list'
export default {
  data () {
    return {
      params: [
        {
          name: 'name',
          title: '姓名',
          symbol: '$like'
        }, {
          name: 'email',
          title: '邮箱',
          symbol: '$like',
          type: 'select',
          options: []
        }
      ]
    }
  },
  components: {
    TableList
  }
}
</script>

<style lang="scss">
.table-card {
  .el-card__body {
    padding: 0;
  }
  .table-search {
    border-bottom: #DDD 1px solid;
    padding: 20px;
    padding-bottom: 0;
  }
}
</style>