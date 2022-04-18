exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: knex.raw('uuid_generate_v4()'), name: 'Suraj_dummy'}
  ]);
  await knex('account').del()
  await knex('account').insert([
    {
      id: knex.raw('uuid_generate_v4()'),
      name: 'RBC',
      balance: 23.12,
      currency: 'CAD',
      user_id: knex.select('id').table('user').first(),
      type: 'investment'
    }
  ]);
};
