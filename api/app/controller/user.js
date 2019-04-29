const BaseController = require('../core/base_controller')
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
  // 登录
  async getLogin () {
    let token = jwt.sign({ type: 'admin', uid: 'hxh' }, this.config.jwtkey, { expiresIn: '20h' })
    this.success(token)
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
