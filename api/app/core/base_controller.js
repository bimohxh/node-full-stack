const { Controller } = require('egg')

class BaseController extends Controller {
  // 成功返回
  success (data) {
    this.ctx.body = {
      status: 200,
      data: data,
      serve_at: Date.now()
    }
  }

  // 失败返回
  fail (status, message) {
    this.ctx.body = {
      status: status,
      message: message,
      serve_at: Date.now()
    }
  }
}
module.exports = BaseController
