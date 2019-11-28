exports.up = function (knex, Promise) {
  return knex.schema.alterTable('topics', (t) => {
    t.text('content')
  })
}

exports.down = function (knex, Promise) {
}
