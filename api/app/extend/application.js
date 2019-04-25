const DB = Symbol('Application#db')

module.exports = {
  // booksshelf 配置
  get db () {
    if (!this[DB]) {
      let knexConf = {
        client: 'mysql',
        connection: this.config.database
      }
      var knex = require('knex')(knexConf)
      var bookshelf = require('bookshelf')(knex)
      bookshelf.plugin(require('bookshelf-uuid'))
      bookshelf.plugin('registry')
      this[DB] = bookshelf
    }
    return this[DB]
  }
}
