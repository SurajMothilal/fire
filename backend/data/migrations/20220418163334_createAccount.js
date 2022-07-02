const tableName = 'accounts'

exports.up = async knex => {
  await knex.schema.createTable(tableName, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.text('name', 128).notNullable()
    tbl.decimal('balance', 15, 2).notNullable()
    tbl.text('currency', 3).notNullable()
    tbl.text('type', 50).notNullable()
    tbl.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE')
    tbl.timestamps(false, true)
  })

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
}

exports.down = knex => knex.schema.dropTableIfExists(tableName)