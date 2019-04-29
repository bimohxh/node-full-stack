<template>
  <div class="table-search" v-if="fields && fields.length > 0">
    <el-form :inline="true" ref="form">
      <template v-for="field in fields">
        <!--文本框搜索-->
        <el-form-item :key="field.name" :label="field.title" v-if="!field.view || field.view === 'text'">
          <el-input v-model="params[field.name]" :placeholder="field.title"></el-input>
        </el-form-item>

        <!--下拉框-->
        <el-form-item :key="field.name" :label="field.title" v-if="field.view === 'select'">
          <el-select v-model="params[field.name]" :placeholder="field.title">
            <el-option
              v-for="item in field.scope"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="resetAction">重置</el-button>
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
    // 搜索动作
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
    
    // 重置
    resetAction: function () {
      this.$emit('input', {})
      Object.keys(this.params).forEach(key => {
        this.params[key] = ''
      })
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
    // 初始化处理 fields
    this.fields.forEach(field => {
      if (field.view === 'select') {
        field.scope.unshift({
          name: '全部',
          value: ''
        })
      }
    })
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