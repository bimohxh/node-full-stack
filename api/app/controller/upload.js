const BaseController = require('../core/base_controller')
const path = require('path')
const fs = require('mz/fs')

class UploadController extends BaseController {
  async postIndex () {
    const ctx = this.ctx
    const file = ctx.request.files[0]
    let _folder = ctx.request.body.folder
    const name = (_folder ? _folder + '/' : '') + path.basename(file.filename)
    // 文件处理，上传到云存储等等
    let result
    try {
      result = await ctx.oss.put(name, file.filepath)
      this.success({
        url: result.url,
        path: name
      })
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath)
    }
  }
}

module.exports = UploadController
