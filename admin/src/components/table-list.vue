<template>
  <div>
    <table-search :fields="searchFields" :mode="mode" v-model="searchParams" :action="searchAction" v-if="init" />
    <el-table :data="items" v-loading="loading">
      <slot />
    </el-table>
    <div class="p-3">
      <el-pagination background layout="prev, pager, next, total"
        :total="pagination.count"
        :page-size="pagination.size" :current-page="pagination.page"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TableSearch from '@/components/table-search'
export default {
  props: ['mode', 'table', 'params','fetchAction', 'pageSize'],
  data () {
    return {
      items: [],
      loading: true,
      pagination: {
        size: this.pageSize || 2,
        count: 0,
        page: 1
      },
      searchParams: {},
      searchFields: this.params,
      init: false
    }
  },
  components: {
    TableSearch
  },
  methods: {
    async fetchItems (page) {
      page = page || this.pagination.page
      this.loading = true
      let res
      let _params = {
        limit: this.pagination.size,
        offset: this.pagination.size * (page -1),
        where: this.getReqParams()
      }
      if (this.fetchAction) {
        res = await this.fetchAction(_params)
      } else {
        res = await this.$axios().get('table/' + this.table, {
          params: _params
        })
      }
      this.items = res.data.data.items
      this.pagination.count = res.data.data.count
      this.loading = false
    },

    // 获取实际发送到后端的查询参数格式
    getReqParams: function () {
      return Object.keys(this.searchParams).reduce((result, key) => {
        let field = this.searchFields.find(item => item.name === key)
        if (field) {
          let _query = {}
          _query[field.symbol || '$eq'] = this.searchParams[key]
          result[key] = _query
        }
        return result
      }, {})
    },

    // 点击分页
    handleCurrentChange: function (page) {
      this.pagination.page = page
      if (this.mode !== 'ajax') {
        this.switchAction()
      }
      this.fetchItems()
    },

    // 初始化解析路由中的查询语句
    parseQuery: function () {
      Object.keys(this.$route.query).forEach(key => {
        if (/^where_/.test(key)) {
          let fieldKey = key.split('_')[1]
          let field = this.searchFields.find(item => item.name === fieldKey)
          if (field) {
            this.searchParams[fieldKey] = this.$route.query[key]
          }
        }
      })
    },

    // 页面跳转 / 搜索逻辑
    switchAction: function () {
      let params = Object.keys(this.searchParams).reduce((result, key) => {
        let _val = this.searchParams[key]
        result.push('where_' + key + '=' + _val)
        return result
      }, [])
      if (this.pagination.page > 1) {
        params.push('page=' + this.pagination.page)
      }
      this.$router.push('?' + params.join('&'))
    },

    // 搜索
    searchAction: function () {
      this.pagination.page = 1
      if (this.mode !== 'ajax') {
        this.switchAction()
      }
      this.fetchItems()
    }
  },
  created () {
    if (this.mode !== 'ajax') {
      this.pagination.page = parseInt(this.$route.query.page || 1)
      this.parseQuery()
    }
    this.init = true
    this.fetchItems()
  }
}
</script>

<style lang="scss">
.table-card {
  .el-card__body {
    padding: 0;
  }
}
</style>