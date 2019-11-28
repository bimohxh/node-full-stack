module.exports = app => {
  const {router, controller} = app
  router.get('/user/login', controller.user.getLogin)
  router.get('/user/session', controller.user.getSession)

  router.post('/upload', controller.upload.postIndex)

  // 万能接口
  router.get('/table/:table', controller.table.getIndex)
  router.get('/table/:table/:id', controller.table.getDetail)


  
  router.get('/topic', controller.topic.getIndex)
}
