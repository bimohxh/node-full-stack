const BaseController = require('../core/base_controller')
// const Board = require('../model/board')

class HomeController extends BaseController {
  async getIndex () {
    let item = await this.app.model.board.where({
      id: 39
    }).fetch()
    this.success(item)
  }
}

module.exports = HomeController
