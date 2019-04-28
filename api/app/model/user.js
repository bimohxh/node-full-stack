module.exports = app => {
  return app.db.model('User', {
    tableName: 'pre_users',
    // uuid: true,
    hasTimestamps: true
  })
}
