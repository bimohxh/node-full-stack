const BaseController = require('../core/base_controller')

class TopicController extends BaseController {
  // 登录
  async getIndex () {
    let goods = await this.app.model.order.where({
      id: '14d93312-3125-43ed-bed8-26a3b28075c9'
    }).query({
      limit: 1,
      offset: 1,
      orderByRaw: 'created_at desc'
    }).fetch()
    this.success({
      items: goods
    })
  }
}

module.exports = TopicController
