exports.up = knex =>
  knex.schema.createTable('account', tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.text('name', 128).notNullable()
    tbl.decimal('balance', 15, 2).notNullable()
    tbl.text('currency', 3).notNullable()
    tbl.uuid('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTableIfExists('account')