exports.up = knex =>
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable('user', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.text('name', 128).notNullable()
})

exports.down = knex => knex.schema.dropTableIfExists('user')