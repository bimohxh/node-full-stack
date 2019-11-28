module.exports = app => {
  return app.db.model('Order', {
    tableName: 'orders',
    uuid: true,
    hasTimestamps: true,
    mycustomer: function () {
      return this.belongsTo(app.model.customer)
    }
  })
}
