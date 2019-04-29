<template>
  <el-card class="table-card">
    <table-list table="user" :params="params">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column  label="性别">
        <template slot-scope="scope">
          {{genderAlia(scope.row.gender)}}
        </template>
      </el-table-column>
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
          symbol: '$like'
        }, {
          name: 'gender',
          title: '性别',
          view: 'select',
          scope: [{
            name: '男',
            value: 'M'
          }, {
            name: '女',
            value: 'F'
          }]
        }
      ]
    }
  },
  components: {
    TableList
  },
  methods: {
    genderAlia (val) {
     return val === 'F' ? '女' : '男'
    }
  }
  
}
</script>

<style lang="scss">

</style>