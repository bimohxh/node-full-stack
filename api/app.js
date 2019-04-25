const path = require('path')

module.exports = app => {
  // 加载模型
  const directory = path.join(app.config.baseDir, 'app/model')
  app.loader.loadToApp(directory, 'model')
}
