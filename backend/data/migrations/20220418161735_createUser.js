const tableName = 'users';

exports.up = async knex => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable(tableName, tbl => {
    tbl.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    tbl.text('name', 128).notNullable()
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