require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'fire_admin',
      password : 'savvy2612',
      database : 'firedevdb'
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

};
