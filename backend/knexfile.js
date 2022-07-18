require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'firedb-dev.ceigi6hygtrv.us-east-1.rds.amazonaws.com',
      port : 5432,
      user : 'suraj2612',
      password : 'savvy2612',
      database : 'firedb-dev'
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
