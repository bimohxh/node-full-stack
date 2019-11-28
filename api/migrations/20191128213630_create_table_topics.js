exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('topics', function (table) {
    table.string('id', 50).primary()
    table.string('title', 100)
    table.integer('visit').default(0).comment('阅读次数')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('topics')
}
