module.exports = app => {
  const {router, controller} = app
  router.get('/', controller.home.getIndex)
  router.post('/upload', controller.upload.postIndex)
}
