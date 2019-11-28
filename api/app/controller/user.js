const BaseController = require('../core/base_controller')
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
  // 登录
  async getLogin () {
    let uid = this.ctx.request.body.uid
    let pwd = this.ctx.request.body.pwd
    let user = await this.app.model.user.where({
      uid: uid,
      pwd: pwd
    }).fetch()
    if (user) {
      let token = jwt.sign({ uid: uid }, this.config.jwtkey, { expiresIn: '20d' })
      this.success(token)
    } else {
      this.fail(400, '用户名或密码错误')
    }
  }

  // 获取用户会话
  async getSession () {
    this.success({
      id: 'hxh',
      uid: 'bimohxh'
    })
  }
}

module.exports = UserController
