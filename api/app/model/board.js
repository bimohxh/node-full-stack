module.exports = app => {
  return app.db.model('Board', {
    tableName: 'pre_boards',
    // uuid: true,
    hasTimestamps: true
  })
}
