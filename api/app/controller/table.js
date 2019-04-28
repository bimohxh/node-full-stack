// 类似万能接口，通过配置操作数据库，需要注意的是权限
// 常用于管理后台的数据操作
const BaseController = require('../core/base_controller')

const maps = {
  user: {
    get: {
    },
    get_id: {
    }
  }
}

// 解析器
const OPERS = {
  $eq: '=',
  $lt: '<',
  $lte: '<=',
  $in: 'in',
  $gt: '>',
  $gte: '<=',
  $like: 'like'
}

// 解析 where 查询参数
const parseWhere = (where, model) => {
  if (!where) {
    return model
  }
  if (typeof where === 'string') {
    where = JSON.parse(where)
  }
  Object.keys(where).forEach(key => {
    let val = where[key]
    if (typeof val !== 'object') {
      val = {
        '$eq': val
      }
    }
    Object.keys(val).forEach(oper => {
      let _val = val[oper]
      let _oper = OPERS[oper]
      if (_oper) {
        if (oper === '$like' && !_val.includes('%')) {
          _val = `%${_val}%`
        }
        model = model.where(key, _oper, _val)
      }
    })
  })
  return model
}

class TableController extends BaseController {
  // 获取数据列表
  async getIndex () {
    let { ctx } = this
    let _table = ctx.params.table
    if (!maps[_table] || !maps[_table].get) {
      this.fail(401, '禁止访问')
      return
    }

    let tableMap = maps[_table].get

    // 分页
    let limit = Math.min((ctx.query.limit || 15), 1000)
    let offset = parseInt(ctx.query.offset || 0)

    let _query = {
      limit: limit,
      offset: offset,
      orderByRaw: tableMap.order || 'created_at DESC'
    }

    // 查询字段
    if (tableMap.fields) {
      _query.select = tableMap.fields.split(',').concat('id')
    }

    let [items, count] = await Promise.all([
      parseWhere(ctx.query.where, this.app.model[_table]).query(_query).fetchAll({
        withRelated: tableMap.withRelated || []
      }),
      parseWhere(ctx.query.where, this.app.model[_table]).count()
    ])

    this.success({
      items: items,
      count: count
    })
  }

  // 获取详情
  async getDetail () {
    let { ctx } = this
    let _table = ctx.params.table
    if (!maps[_table] || !maps[_table].get_id) {
      this.fail(401, '禁止访问')
      return
    }

    let tableMap = maps[_table].get_id

    let _query = {}

    // 查询字段
    if (tableMap.fields) {
      _query.select = tableMap.fields.split(',').concat('id')
    }

    let item = await this.app.model[_table].where({
      id: ctx.params.id
    }).query(_query).fetch({
      withRelated: tableMap.withRelated || []
    })

    this.success(item)
  }

  // 新增
  async postIndex () {
    let { ctx } = this
    let _table = ctx.params.table
    if (!maps[_table] || !maps[_table].post) {
      this.fail(401, '禁止访问')
      return
    }

    let tableMap = maps[_table].post

    // 数据
    let data = {}
    ;(tableMap.keys || []).forEach(key => {
      data[key] = ctx.body[key]
    })

    let item = await this.app.model[_table].forge(data).save()
    this.success(item)
  }

  // 更新
  async putIndex () {
    let { ctx } = this
    let _table = ctx.params.table
    if (!maps[_table] || !maps[_table].put) {
      this.fail(401, '禁止访问')
      return
    }

    let tableMap = maps[_table].put

    let item = await this.app.model[_table].where({
      id: ctx.body.id
    }).fetch()

    if (!item) {
      this.fail(402, '对象不存在')
      return
    }

    ;(tableMap.keys || []).forEach(key => {
      if (ctx.body[key] !== undefined) {
        item.set(key, ctx.body[key])
      }
    })

    await item.save()
    this.success(item)
  }

  // 删除
  async deleteIndex () {
    let { ctx } = this
    let _table = ctx.params.table
    if (!maps[_table] || !maps[_table].delete) {
      this.fail(401, '禁止访问')
      return
    }

    let item = await this.app.model[_table].where({
      id: ctx.body.id
    }).fetch()

    if (!item) {
      this.fail(402, '对象不存在')
      return
    }

    await item.destroy()
    this.success('ok')
  }
}

module.exports = TableController
