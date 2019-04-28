module.exports = app => {
  const {router, controller} = app
  router.get('/', controller.home.getIndex)
  router.post('/upload', controller.upload.postIndex)

  // 万能接口
  router.get('/table/:table', controller.table.getIndex)
  router.get('/table/:table/:id', controller.table.getDetail)
}
