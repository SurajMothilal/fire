const tableName = 'fireprofile'

exports.up = async knex => {
  await knex.schema.createTable(tableName, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.integer('targetYear', 4).notNullable()
    tbl.text('fireType', 128).notNullable()
    tbl.decimal('targetYearlyExpense', 15, 2)
    tbl.decimal('targetPortfolioValue', 15, 2)
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