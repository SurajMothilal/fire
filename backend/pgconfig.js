var pg = require('pg');
var config = {
  user: 'fire_admin',
  database: 'firedevdb',
  password: 'savvy2612',
  port: 5432, 
  max: 10,
  idleTimeoutMillis: 30000,
};

module.exports = new pg.Pool(config)
