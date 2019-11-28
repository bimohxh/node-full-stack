module.exports = app => {
  return app.db.model('Good', {
    tableName: 'goods',
    uuid: true,
    hasTimestamps: true
  })
}
