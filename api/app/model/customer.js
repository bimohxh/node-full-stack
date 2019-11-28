module.exports = app => {
  return app.db.model('Customer', {
    tableName: 'customers',
    uuid: true,
    hasTimestamps: true,
    orders: function () {
      return this.hasMany(app.model.order)
    }
  })
}
