exports.up = knex =>
  knex.schema.createTable('accounts', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.text('name', 128).notNullable()
    tbl.decimal('balance', 15, 2).notNullable()
    tbl.text('currency', 3).notNullable()
    tbl.text('type', 50).notNullable()
    tbl.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTableIfExists('accounts')