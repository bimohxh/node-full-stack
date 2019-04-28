<template>
  <div class="table-search">
    <el-form :inline="true" ref="form">
      <template v-for="field in fields">
        <!--文本框搜索-->
        <el-form-item :label="field.title">
          <el-input v-model="params[field.name]" :placeholder="field.title"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="searchAction">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['mode', 'fields', 'value', 'action'],
  data () {
    return {
      params: {}
    }
  },
  methods: {
    searchAction: function () {
      let params = this.fields.reduce((result, field) => {
        let _val = this.params[field.name]
        if (_val) {
          result[field.name] = _val
        }
        return result
      }, {})
      this.$emit('input', params)
      this.action()
    },
    // 设置搜索表单的值
    setParams: function () {
      this.params = this.fields.reduce((result, field) => {
        result[field.name] = this.value[field.name] || (field.default || '')
        return result
      }, {})
    }
  },
  created () {
    this.setParams()
  }
}
</script>

<style lang="scss">
.table-card {
  .el-card__body {
    padding: 0;
  }
  .table-search {
    border-bottom: #EEE 1px solid;
    padding: 20px;
    padding-bottom: 0;
  }
}
</style>